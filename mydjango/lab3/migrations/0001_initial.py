# Generated by Django 4.2.5 on 2024-11-19 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team_name', models.CharField(max_length=45, unique=True)),
                ('stadium', models.CharField(max_length=45)),
                ('city', models.CharField(max_length=45)),
            ],
        ),
    ]
