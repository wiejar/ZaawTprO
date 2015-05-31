# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = []

    operations = [migrations.CreateModel(name='Account', fields=[
        ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
        ('password', models.CharField(verbose_name='password', max_length=128)),
        ('last_login', models.DateTimeField(default=django.utils.timezone.now, verbose_name='last login')),
        ('email', models.EmailField(unique=True, max_length=75)),
        ('username', models.CharField(unique=True, max_length=40)),
        ('first_name', models.CharField(blank=True, max_length=40)),
        ('last_name', models.CharField(blank=True, max_length=40)),
        ('tagline', models.CharField(blank=True, max_length=140)), ('is_admin', models.BooleanField(default=False)),
        ('created_at', models.DateTimeField(auto_now_add=True)), ('update_at', models.DateTimeField(auto_now=True)), ],
                                         options={'abstract': False, }, bases=(models.Model,), ), ]
