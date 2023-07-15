# Generated by Django 4.2.3 on 2023-07-12 07:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("core", "0005_academicyearmodel"),
    ]

    operations = [
        migrations.CreateModel(
            name="AcademicClassModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("class_name", models.CharField(max_length=50)),
            ],
            options={
                "db_table": 'academic"."classes',
            },
        ),
        migrations.CreateModel(
            name="AcademicTypeModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("academic_type", models.CharField(max_length=20)),
            ],
            options={
                "db_table": 'academic"."academic_type',
            },
        ),
        migrations.CreateModel(
            name="FacultyModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                (
                    "faculty_name",
                    models.CharField(db_column="faculty_name", max_length=20),
                ),
            ],
            options={
                "db_table": 'academic"."faculties',
            },
        ),
        migrations.CreateModel(
            name="SubjectModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("subject_code", models.CharField(max_length=6)),
                ("subject_name", models.CharField(max_length=60)),
                ("status", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="CoursesModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("course_code", models.CharField(max_length=15)),
                ("course_name", models.CharField(max_length=100)),
                ("status", models.BooleanField(default=True)),
                (
                    "academic_type_id",
                    models.ForeignKey(
                        db_column="academic_type_id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="academic.academictypemodel",
                    ),
                ),
                (
                    "faculty_id",
                    models.ForeignKey(
                        db_column="faculty_Id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="academic.facultymodel",
                    ),
                ),
                (
                    "subjects",
                    models.ManyToManyField(
                        db_column="subjects",
                        related_name="courses",
                        to="academic.subjectmodel",
                    ),
                ),
            ],
            options={
                "db_table": 'academic"."courses',
            },
        ),
        migrations.CreateModel(
            name="AcademicSectionModel",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("no_of_section", models.IntegerField()),
                (
                    "academic_year_id",
                    models.ForeignKey(
                        db_column="academic_year_id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="core.academicyearmodel",
                    ),
                ),
                (
                    "class_id",
                    models.ForeignKey(
                        db_column="class_id",
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="academic.academicclassmodel",
                    ),
                ),
            ],
            options={
                "db_table": 'academic"."section_details',
            },
        ),
    ]
