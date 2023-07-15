# Generated by Django 4.2.3 on 2023-07-13 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("student", "0004_studentcontactmodel_student_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="studentaddressmodel",
            name="student_id",
            field=models.ForeignKey(
                db_column="student_id",
                default=1,
                on_delete=django.db.models.deletion.DO_NOTHING,
                to="student.studentmodel",
            ),
            preserve_default=False,
        ),
    ]
