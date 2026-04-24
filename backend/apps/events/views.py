from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from .models import Event
from .serializers import EventSerializer, EventCreateSerializer
from apps.accounts.permissions import IsOrganizerOrAdmin, IsOwnerOrAdmin
from apps.notifications.email_service import send_cancellation_email


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return EventCreateSerializer
        return EventSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        if self.action in ['create']:
            return [IsOrganizerOrAdmin()]
        if self.action in ['update', 'partial_update', 'destroy', 'cancel']:
            return [IsAuthenticated(), IsOwnerOrAdmin()]
        if self.action == 'my_events':
            return [IsAuthenticated()]
        return [IsAuthenticated()]

    def get_queryset(self):
        qs = Event.objects.all()
        if self.action == 'list':
            qs = qs.filter(is_public=True)
        q = self.request.query_params.get('search')
        if q:
            qs = qs.filter(Q(title__icontains=q) | Q(location__icontains=q))
        date_from = self.request.query_params.get('date_from')
        if date_from:
            qs = qs.filter(date__gte=date_from)
        date_to = self.request.query_params.get('date_to')
        if date_to:
            qs = qs.filter(date__lte=date_to)
        location = self.request.query_params.get('location')
        if location:
            qs = qs.filter(location__icontains=location)
        return qs

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_events(self, request):
        events = Event.objects.filter(organizer=request.user)
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def cancel(self, request, pk=None):
        event = self.get_object()
        self.check_object_permissions(request, event)
        event.status = 'cancelled'
        event.save()
        confirmed = event.registrations.filter(status='confirmed')
        for reg in confirmed:
            try:
                send_cancellation_email(reg, reason='Event has been cancelled by the organizer.')
            except Exception:
                pass
        return Response({'detail': 'Event cancelled and participants notified.'})
