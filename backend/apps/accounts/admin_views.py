from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import UserSerializer, UserRoleSerializer
from .permissions import IsAdminUser
from apps.events.models import Event
from apps.registrations.models import Registration


class AdminStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({
            'total_users': CustomUser.objects.count(),
            'total_events': Event.objects.count(),
            'total_registrations': Registration.objects.count(),
            'active_events': Event.objects.filter(status='active').count(),
            'organizers': CustomUser.objects.filter(role='organizer').count(),
            'participants': CustomUser.objects.filter(role='participant').count(),
        })


class AdminUserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.all().order_by('-created_at')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class AdminChangeRoleView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserRoleSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserSerializer(user).data)
