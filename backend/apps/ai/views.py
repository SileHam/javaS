from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .predictor import predict_attendance, get_participant_profile


class PredictAttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, event_id):
        result = predict_attendance(event_id)
        return Response(result)


class ParticipantProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, event_id):
        result = get_participant_profile(event_id)
        return Response(result)
