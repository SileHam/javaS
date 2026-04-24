from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from .models import Registration
from .serializers import RegistrationSerializer, RegistrationStatusSerializer
from apps.accounts.permissions import IsOwnerOrAdmin, IsOrganizerOrAdmin
from apps.notifications.email_service import (
    send_confirmation_email, send_cancellation_email, send_badge_ready_email
)


class RegistrationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.action == 'update_status':
            return RegistrationStatusSerializer
        return RegistrationSerializer

    def get_queryset(self):
        return Registration.objects.select_related('event', 'participant').all()

    @transaction.atomic
    def create(self, request):
        event_id = request.data.get('event_id')
        from apps.events.models import Event
        try:
            event = Event.objects.select_for_update().get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'detail': 'Event not found.'}, status=status.HTTP_404_NOT_FOUND)

        if event.available_spots <= 0:
            return Response({'detail': 'No spots available.'}, status=status.HTTP_400_BAD_REQUEST)

        if event.status != 'active':
            return Response({'detail': 'Event is not active.'}, status=status.HTTP_400_BAD_REQUEST)

        if Registration.objects.filter(event=event, participant=request.user).exists():
            return Response({'detail': 'Already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = RegistrationSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        registration = serializer.save(participant=request.user)

        event.available_spots -= 1
        event.save()

        try:
            send_confirmation_email(registration)
        except Exception:
            pass

        return Response(RegistrationSerializer(registration).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def my_registrations(self, request):
        regs = Registration.objects.filter(participant=request.user).select_related('event')
        serializer = RegistrationSerializer(regs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='event/(?P<event_id>[^/.]+)')
    def event_registrations(self, request, event_id=None):
        from apps.events.models import Event
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'detail': 'Event not found.'}, status=status.HTTP_404_NOT_FOUND)

        if event.organizer != request.user and request.user.role != 'admin':
            return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)

        regs = Registration.objects.filter(event=event).select_related('participant')
        serializer = RegistrationSerializer(regs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        registration = self.get_object()
        event = registration.event
        if event.organizer != request.user and request.user.role != 'admin':
            return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)

        new_status = request.data.get('status')
        if new_status not in ['confirmed', 'cancelled']:
            return Response({'detail': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

        registration.status = new_status
        registration.save()

        if new_status == 'confirmed':
            try:
                send_badge_ready_email(registration)
            except Exception:
                pass

        return Response(RegistrationSerializer(registration).data)

    @transaction.atomic
    def destroy(self, request, pk=None):
        registration = self.get_object()
        if registration.participant != request.user and request.user.role != 'admin':
            return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)

        if registration.status in ['pending', 'confirmed']:
            event = registration.event
            event.available_spots += 1
            event.save()

        registration.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
