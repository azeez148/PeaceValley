from core.user.models import Department, Doctor, Patient, Schedule, TimeInterval, User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'created', 'updated', 'is_staff']
        read_only_field = ['is_active', 'created', 'updated']



class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ['id', 'name', 'is_active', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']


class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'is_active', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']


class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ['id', 'name', 'is_active', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']


class TimeIntervalSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimeInterval
        fields = ['id', 'name', 'start_time', 'end_time', 'is_active', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']



class ScheduleSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='doctor.name', read_only=True)
    patient = serializers.CharField(source='patient.name', read_only=True)
    department = serializers.CharField(source='department.name', read_only=True)
    time_start = serializers.CharField(source='interval.start_time', read_only=True)
    time_end = serializers.CharField(source='interval.end_time', read_only=True)
    # # doctor_name = serializers.SerializerMethodField(source='get_doc_name')
    
    # # doctor = DoctorSerializer(many=True)

    class Meta:
        model = Schedule
        fields = ['id', 'name', 'schedule_date', 'doctor', 'patient', 'interval', 'department', 'time_start', 'time_end']
        read_only_field = ['is_active', 'created', 'updated']
