# Generated by Django 4.2.3 on 2023-07-30 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0007_dayoperationsmodel"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dayoperationsmodel",
            name="eod_on",
            field=models.DateTimeField(null=True),
        ),
    ]
