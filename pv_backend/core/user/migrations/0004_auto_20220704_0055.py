# Generated by Django 3.2.4 on 2022-07-04 07:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core_user', '0003_department_doctor_patient_timeinterval'),
    ]

    operations = [
        migrations.RenameField(
            model_name='timeinterval',
            old_name='interval',
            new_name='name',
        ),
        migrations.AddField(
            model_name='timeinterval',
            name='end_time',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='timeinterval',
            name='start_time',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
