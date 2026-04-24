from django.utils import timezone
from datetime import timedelta


def send_event_reminders():
    """Send reminders 24h before event. Run via cron or Celery beat."""
    from apps.registrations.models import Registration
    from .email_service import send_reminder_email

    tomorrow = timezone.now() + timedelta(days=1)
    window_start = tomorrow.replace(hour=0, minute=0, second=0)
    window_end = tomorrow.replace(hour=23, minute=59, second=59)

    registrations = Registration.objects.filter(
        status='confirmed',
        event__date__range=(window_start, window_end),
        event__status='active',
    ).select_related('event', 'participant')

    for reg in registrations:
        try:
            send_reminder_email(reg)
        except Exception:
            pass
