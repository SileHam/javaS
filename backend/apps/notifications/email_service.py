from django.core.mail import send_mail
from django.conf import settings


def _send(subject, message, to_email):
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[to_email],
        fail_silently=False,
        html_message=message,
    )


def send_confirmation_email(registration):
    event = registration.event
    participant = registration.participant
    subject = f"Registration Confirmed — {event.title}"
    message = f"""
    <h2>Hello {participant.name},</h2>
    <p>Your registration for <strong>{event.title}</strong> has been received.</p>
    <ul>
        <li><strong>Date:</strong> {event.date.strftime('%d %B %Y at %H:%M')}</li>
        <li><strong>Location:</strong> {event.location}</li>
        <li><strong>Status:</strong> {registration.status.capitalize()}</li>
    </ul>
    <p>Thank you for registering. We will notify you once your spot is confirmed.</p>
    <p>— The EventMaster Team</p>
    """
    _send(subject, message, participant.email)


def send_reminder_email(registration):
    event = registration.event
    participant = registration.participant
    subject = f"Reminder: {event.title} is coming up!"
    message = f"""
    <h2>Hello {participant.name},</h2>
    <p>This is a reminder that <strong>{event.title}</strong> is happening soon.</p>
    <ul>
        <li><strong>Date:</strong> {event.date.strftime('%d %B %Y at %H:%M')}</li>
        <li><strong>Location:</strong> {event.location}</li>
    </ul>
    <p>We look forward to seeing you there!</p>
    <p>— The EventMaster Team</p>
    """
    _send(subject, message, participant.email)


def send_cancellation_email(registration, reason=''):
    event = registration.event
    participant = registration.participant
    subject = f"Event Cancelled — {event.title}"
    message = f"""
    <h2>Hello {participant.name},</h2>
    <p>We regret to inform you that <strong>{event.title}</strong> has been cancelled.</p>
    {f'<p><strong>Reason:</strong> {reason}</p>' if reason else ''}
    <p>We apologize for any inconvenience caused.</p>
    <p>— The EventMaster Team</p>
    """
    _send(subject, message, participant.email)


def send_badge_ready_email(registration):
    event = registration.event
    participant = registration.participant
    subject = f"Your Badge is Ready — {event.title}"
    message = f"""
    <h2>Hello {participant.name},</h2>
    <p>Great news! Your registration for <strong>{event.title}</strong> has been
    <strong>confirmed</strong>.</p>
    <p>You can now download your badge from the EventMaster platform.</p>
    <ul>
        <li><strong>Date:</strong> {event.date.strftime('%d %B %Y at %H:%M')}</li>
        <li><strong>Location:</strong> {event.location}</li>
    </ul>
    <p>See you there!</p>
    <p>— The EventMaster Team</p>
    """
    _send(subject, message, participant.email)
