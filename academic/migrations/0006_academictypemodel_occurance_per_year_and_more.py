# Generated by Django 4.2.3 on 2023-08-15 16:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('academic', '0005_alter_academicclassmodel_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='academictypemodel',
            name='occurance_per_year',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='coursesmodel',
            name='course_duration',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='AcademicChargesModel',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('charge_code', models.CharField(max_length=10)),
                ('charge_name', models.CharField(max_length=100)),
                ('charge_amount', models.DecimalField(decimal_places=2, max_digits=5)),
                ('is_active', models.BooleanField(default=True)),
                ('class_id', models.ForeignKey(db_column='class_id', on_delete=django.db.models.deletion.DO_NOTHING, to='academic.academicclassmodel')),
                ('course_id', models.ForeignKey(blank=True, db_column='course_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='academic.coursesmodel')),
            ],
            options={
                'verbose_name': 'Adacemic Charge',
                'verbose_name_plural': 'Academic Charges',
                'db_table': 'academic"."charges',
            },
        ),
    ]