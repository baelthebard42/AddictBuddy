# Generated by Django 4.2.9 on 2024-01-29 09:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('addictbuddy', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accomplishments',
            name='askedAMotivationalQuote',
        ),
        migrations.RemoveField(
            model_name='accomplishments',
            name='askedAboutSkillorBook',
        ),
    ]
