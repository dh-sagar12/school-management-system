# Generated by Django 4.2.3 on 2023-07-23 16:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_academicyearmodel"),
        ("authentication", "0004_user_branch_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="MenuPermissionModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("can_edit", models.BooleanField(default=False)),
                (
                    "branch_id",
                    models.ForeignKey(
                        db_column="branch_id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="core.branchmodel",
                    ),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        db_column="created_by",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        related_name="menu_policies_created_by",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "menu_id",
                    models.ForeignKey(
                        db_column="menu_id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="core.menumodel",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        db_column="user_id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        related_name="menu_policies_user_id",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Menu Policy",
                "verbose_name_plural": "Menu Policies",
                "db_table": 'auth"."menu_policies',
            },
        ),
        migrations.CreateModel(
            name="BranchLoginPolicyModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("date_access_from", models.DateField(db_column="date_access_from")),
                ("date_access_to", models.DateField(db_column="date_access_to")),
                ("time_access_from", models.TimeField(db_column="time_access_from")),
                ("time_access_to", models.TimeField(db_column="time_access_to")),
                (
                    "branch_id",
                    models.ForeignKey(
                        db_column="branch_id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="core.branchmodel",
                    ),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        db_column="created_by",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        related_name="branch_policies_created_by",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        db_column="user_id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        related_name="branch_policies_user_id",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Branch Policy",
                "verbose_name_plural": "Branch Policies",
                "db_table": 'auth"."branch_policies',
            },
        ),
    ]
