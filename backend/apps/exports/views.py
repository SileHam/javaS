from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.accounts.permissions import IsOrganizerOrAdmin
from apps.events.models import Event
from apps.registrations.models import Registration
from .pdf_service import generate_attendance_pdf, generate_badge_pdf
from .excel_service import generate_attendance_excel


class AttendancePDFView(APIView):
    permission_classes = [IsOrganizerOrAdmin]

    def get(self, request, event_id):
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'detail': 'Event not found.'}, status=status.HTTP_404_NOT_FOUND)
        if event.organizer != request.user and request.user.role != 'admin':
            return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)
        buf = generate_attendance_pdf(event)
        response = HttpResponse(buf, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="attendance_{event_id}.pdf"'
        return response


class AttendanceExcelView(APIView):
    permission_classes = [IsOrganizerOrAdmin]

    def get(self, request, event_id):
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'detail': 'Event not found.'}, status=status.HTTP_404_NOT_FOUND)
        if event.organizer != request.user and request.user.role != 'admin':
            return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)
        buf = generate_attendance_excel(event)
        response = HttpResponse(
            buf,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = f'attachment; filename="attendance_{event_id}.xlsx"'
        return response


class BadgePDFView(APIView):
    permission_classes = [IsOrganizerOrAdmin]

    def get(self, request, registration_id):
        try:
            registration = Registration.objects.get(pk=registration_id)
        except Registration.DoesNotExist:
            return Response({'detail': 'Registration not found.'}, status=status.HTTP_404_NOT_FOUND)
        buf = generate_badge_pdf(registration)
        response = HttpResponse(buf, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="badge_{registration_id}.pdf"'
        return response
