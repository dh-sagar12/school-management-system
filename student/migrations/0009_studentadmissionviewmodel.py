# Generated by Django 4.2.3 on 2023-08-14 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0008_alter_studentaddressmodel_district_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentAdmissionViewModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('admission_date_ad', models.DateField()),
                ('admission_date', models.CharField(max_length=50)),
                ('student_id', models.BigIntegerField()),
                ('student_name', models.CharField(max_length=100)),
                ('contact_number', models.CharField(max_length=100)),
                ('class_name', models.CharField(max_length=50)),
                ('faculty_name', models.CharField(max_length=50)),
                ('course_name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Student Admission View',
                'verbose_name_plural': 'Student Admission Views',
                'db_table': 'student"."student_admission_view',
                'managed': False,
            },
        ),
        migrations.RunSQL(
            "DROP VIEW IF EXISTS student.student_admission_view;", 
            """ 
             CREATE OR REPLACE VIEW student.student_admission_view as 
                SELECT 
                c.id,
                c.admission_date admission_date_ad, 
                core.date_np(c.admission_date)::character varying(50) admission_date,
                s.student_id,
                (s.first_name ||' '|| s.middle_name  ||' '|| s.last_name)::character varying(100) student_name,
                string_agg(cd.contact_number, ', ')::character varying(100) contact_number,
                ac.class_name,
                f.faculty_name,
                courses.course_name 
                FROM student.class_details c 
                JOIN student.students s  ON s.id = c.student_id
                JOIN academic.classes ac on ac.id = c.class_id
                LEFT JOIN academic.courses  ON c.course_id = courses.id
				LEFT JOIN academic.faculties f ON f.id = courses."faculty_Id"
                LEFT JOIN student.contact_details cd ON cd.student_id = s.id
                GROUP BY admission_date, s.student_id, first_name, middle_name, last_name, 
                class_name, faculty_name, course_name, c.id;
            """
        )
    ]
