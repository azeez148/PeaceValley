from rest_framework.routers import SimpleRouter
from core.user.viewsets import DepartmentViewSet, DoctorViewSet, PatientViewSet, ScheduleViewSet, TimeIntervalViewSet, UserViewSet
from core.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet


routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', UserViewSet, basename='user')

routes.register(r'department', DepartmentViewSet, basename='department')
routes.register(r'doctor', DoctorViewSet, basename='doctor')
routes.register(r'patient', PatientViewSet, basename='patient')
routes.register(r'interval', TimeIntervalViewSet, basename='interval')

routes.register(r'schedule', ScheduleViewSet, basename='schedule')

urlpatterns = [
    *routes.urls
]
