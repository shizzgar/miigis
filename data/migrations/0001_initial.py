# Generated by Django 2.1.4 on 2019-01-03 17:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FileInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateTimeLabel', models.DateTimeField()),
                ('gl', models.IntegerField()),
                ('L', models.IntegerField()),
                ('T', models.CharField(max_length=100)),
                ('BAT', models.IntegerField()),
                ('ACC', models.CharField(max_length=100)),
                ('G4', models.CharField(max_length=100)),
                ('GPS', models.CharField(max_length=100)),
                ('temperature', models.FloatField()),
                ('CO', models.FloatField()),
                ('NO2', models.FloatField()),
                ('fileInfo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data.FileInfo')),
            ],
        ),
    ]
