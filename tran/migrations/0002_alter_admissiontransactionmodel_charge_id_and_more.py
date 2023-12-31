# Generated by Django 4.2.3 on 2023-08-20 06:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0011_studentclassmodel_academic_session_type'),
        ('academic', '0009_alter_academicchargesmodel_charge_amount'),
        ('tran', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admissiontransactionmodel',
            name='charge_id',
            field=models.ForeignKey(db_column='charge_id', on_delete=django.db.models.deletion.DO_NOTHING, to='academic.academicchargesmodel'),
        ),
        migrations.AlterField(
            model_name='admissiontransactionmodel',
            name='student_id',
            field=models.ForeignKey(db_column='student_id', on_delete=django.db.models.deletion.DO_NOTHING, to='student.studentmodel'),
        ),
        migrations.AlterField(
            model_name='admissiontransactionmodel',
            name='tran_id',
            field=models.ForeignKey(db_column='tran_id', on_delete=django.db.models.deletion.DO_NOTHING, to='tran.transactionmastermodel'),
        ),
    ]
