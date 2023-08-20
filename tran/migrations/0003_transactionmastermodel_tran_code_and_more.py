# Generated by Django 4.2.3 on 2023-08-20 06:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tran', '0002_alter_admissiontransactionmodel_charge_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='transactionmastermodel',
            name='tran_code',
            field=models.CharField(default=11, max_length=15),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='transactionmastermodel',
            name='created_by',
            field=models.ForeignKey(db_column='created_by', on_delete=django.db.models.deletion.DO_NOTHING, related_name='created_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='transactionmastermodel',
            name='verified_by',
            field=models.ForeignKey(db_column='verified_by', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='verified_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
