from django.utils import timezone
from datetime import timedelta


def predict_attendance(event_id):
    from apps.events.models import Event
    from apps.registrations.models import Registration
    import numpy as np

    try:
        from sklearn.linear_model import LinearRegression
    except ImportError:
        return {'predicted_percentage': 0, 'confidence_score': 0, 'error': 'scikit-learn not installed'}

    try:
        target_event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return {'predicted_percentage': 0, 'confidence_score': 0, 'error': 'Event not found'}

    historical = Event.objects.exclude(pk=event_id).filter(status__in=['active', 'completed'])

    X, y = [], []
    for ev in historical:
        regs = ev.registrations.filter(status__in=['pending', 'confirmed']).count()
        if ev.capacity == 0:
            continue
        days_since_creation = max((timezone.now() - ev.created_at).days, 0)
        fill_rate = regs / ev.capacity
        days_until = max((ev.date - timezone.now()).days, 0)
        X.append([days_since_creation, fill_rate, days_until, int(ev.is_public)])
        y.append(fill_rate * 100)

    if len(X) < 2:
        current_regs = target_event.registrations.filter(status__in=['pending', 'confirmed']).count()
        pct = (current_regs / target_event.capacity * 100) if target_event.capacity > 0 else 0
        return {'predicted_percentage': round(pct, 1), 'confidence_score': 0.0}

    model = LinearRegression()
    model.fit(np.array(X), np.array(y))

    t_regs = target_event.registrations.filter(status__in=['pending', 'confirmed']).count()
    t_fill = t_regs / target_event.capacity if target_event.capacity > 0 else 0
    t_days_since = max((timezone.now() - target_event.created_at).days, 0)
    t_days_until = max((target_event.date - timezone.now()).days, 0)

    features = np.array([[t_days_since, t_fill, t_days_until, int(target_event.is_public)]])
    predicted = float(model.predict(features)[0])
    predicted = max(0, min(100, predicted))

    score = min(len(X) / 20, 1.0)

    return {
        'predicted_percentage': round(predicted, 1),
        'confidence_score': round(score, 2),
        'current_fill_rate': round(t_fill * 100, 1),
        'current_registrations': t_regs,
        'capacity': target_event.capacity,
    }


def get_participant_profile(event_id):
    from apps.registrations.models import Registration
    from collections import Counter

    regs = Registration.objects.filter(event_id=event_id).select_related('participant')
    now = timezone.now()

    registrations_by_day = {}
    for i in range(7):
        day = (now - timedelta(days=i)).date()
        registrations_by_day[str(day)] = 0

    hours = []
    days_before_list = []
    confirmed = pending = 0

    for reg in regs:
        day_key = str(reg.registered_at.date())
        if day_key in registrations_by_day:
            registrations_by_day[day_key] += 1
        hours.append(reg.registered_at.hour)
        from apps.events.models import Event
        try:
            event = Event.objects.get(pk=event_id)
            days_before = (event.date.date() - reg.registered_at.date()).days
            if days_before >= 0:
                days_before_list.append(days_before)
        except Exception:
            pass
        if reg.status == 'confirmed':
            confirmed += 1
        elif reg.status == 'pending':
            pending += 1

    hour_counter = Counter(hours)
    peak_hour = hour_counter.most_common(1)[0][0] if hour_counter else 0
    avg_days = round(sum(days_before_list) / len(days_before_list), 1) if days_before_list else 0

    return {
        'registrations_by_day': registrations_by_day,
        'peak_registration_hour': peak_hour,
        'confirmed_vs_pending': {'confirmed': confirmed, 'pending': pending},
        'average_days_before_event': avg_days,
        'total_registrations': regs.count(),
    }
