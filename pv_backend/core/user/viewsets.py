from sqlite3 import Time
from core.user.serializers import DepartmentSerializer, DoctorSerializer, PatientSerializer, ScheduleSerializer, TimeIntervalSerializer, UserSerializer
from core.user.models import Department, Doctor, Patient, Schedule, TimeInterval, User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework import status
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj


class DepartmentViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        return Department.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Department.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        department = serializer.save()
        
        return Response({
            "department": serializer.data
        }, status=status.HTTP_201_CREATED)
    
    
class DoctorViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    serializer_class = DoctorSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        return Doctor.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Doctor.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        doctor = serializer.save()
        
        return Response({
            "doctor": serializer.data
        }, status=status.HTTP_201_CREATED)


class PatientViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    serializer_class = PatientSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        return Patient.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Patient.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        patient = serializer.save()
        
        return Response({
            "patient": serializer.data
        }, status=status.HTTP_201_CREATED)

class TimeIntervalViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    serializer_class = TimeIntervalSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        return TimeInterval.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        obj = TimeInterval.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)
        return obj
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        interval = serializer.save()
        return Response({
            "interval": serializer.data
        }, status=status.HTTP_201_CREATED)


class ScheduleViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    serializer_class = ScheduleSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['schedule_date']
    ordering = ['schedule_date']

    def get_queryset(self):
        return Schedule.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        obj = Schedule.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)
        return obj
    
    def create(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()

        print(request.data)
        
        schedule_date = request.data['schedule_date']
        # t = TimeInterval.objects.get(id=request.data['interval'])
        s = Schedule.objects.filter(interval=request.data['interval']).filter(schedule_date=schedule_date).all()
        
        if s:
            return Response(status=status.HTTP_208_ALREADY_REPORTED)
        
        schedule = Schedule()
        name = request.data['name']
        schedule.name = name
        schedule.schedule_date = schedule_date



        d = Doctor.objects.get(id=request.data['doctor'])
        schedule.doctor = d

        t = TimeInterval.objects.get(id=request.data['interval'])
        schedule.interval = t

        p = Patient.objects.get(id=request.data['patient'])
        schedule.patient = p

        dept = Department.objects.get(id=request.data['department'])
        schedule.department = dept

        


        schedule.save()
        # Schedule s = new Schedule()
        
        # schedule = serializer.save()
        return Response(status=status.HTTP_201_CREATED)
