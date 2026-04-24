from django.urls import path
from .views import PredictAttendanceView, ParticipantProfileView

urlpatterns = [
    path('predict/<int:event_id>/', PredictAttendanceView.as_view(), name='ai-predict'),
    path('profile/<int:event_id>/', ParticipantProfileView.as_view(), name='ai-profile'),
]
