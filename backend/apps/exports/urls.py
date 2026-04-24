from django.urls import path
from .views import AttendancePDFView, AttendanceExcelView, BadgePDFView

urlpatterns = [
    path('event/<int:event_id>/pdf/', AttendancePDFView.as_view(), name='export-pdf'),
    path('event/<int:event_id>/excel/', AttendanceExcelView.as_view(), name='export-excel'),
    path('badge/<int:registration_id>/', BadgePDFView.as_view(), name='export-badge'),
]
