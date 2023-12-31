# Generated by Django 4.2.3 on 2023-07-10 18:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("core", "0004_districtmodel_provincesmodel_localbodiesmodel_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="StudentContactModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                (
                    "relation_type",
                    models.CharField(
                        choices=[
                            ("Father", "Father"),
                            ("Mother", "Mother"),
                            ("Other", "Other"),
                        ]
                    ),
                ),
                (
                    "contact_type",
                    models.CharField(
                        choices=[
                            ("Landline", "Landline"),
                            ("Mobile", "Mobile"),
                            ("Other", "Other"),
                        ]
                    ),
                ),
                ("contact_number", models.CharField(blank=True, max_length=15)),
            ],
            options={
                "db_table": 'student"."contact_details',
            },
        ),
        migrations.CreateModel(
            name="StudentModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("first_name", models.CharField(db_index=True, max_length=100)),
                (
                    "middle_name",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("last_name", models.CharField(db_index=True, max_length=100)),
                ("date_of_birth", models.DateField()),
                ("father_name", models.CharField(max_length=100)),
                ("mother_name", models.CharField(max_length=100)),
                ("grand_father_name", models.CharField(max_length=100)),
                ("email", models.EmailField(blank=True, max_length=200, null=True)),
                ("created_on", models.DateTimeField(auto_now_add=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": 'student"."students',
            },
        ),
        migrations.CreateModel(
            name="StudentAddressModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                (
                    "address_type",
                    models.CharField(
                        choices=[
                            ("Permanent", "Permanent"),
                            ("Temporary", "Temporary"),
                            ("Other", "Other"),
                        ]
                    ),
                ),
                ("ward_no", models.IntegerField()),
                ("street", models.CharField(blank=True, max_length=50, null=True)),
                ("tole_name", models.CharField(blank=True, max_length=50, null=True)),
                (
                    "district_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="core.districtmodel",
                    ),
                ),
                (
                    "local_bodies_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="core.localbodiesmodel",
                    ),
                ),
                (
                    "state_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="core.provincesmodel",
                    ),
                ),
            ],
            options={
                "db_table": 'student"."address_details',
            },
        ),
    ]
