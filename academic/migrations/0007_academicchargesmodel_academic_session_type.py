# Generated by Django 4.2.3 on 2023-08-15 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academic', '0006_academictypemodel_occurance_per_year_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='academicchargesmodel',
            name='academic_session_type',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
