# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = []

    operations = [migrations.CreateModel(name='Product', fields=[
        ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
        ('category', models.CharField(blank=True, max_length=40)), ('name', models.CharField(max_length=200)),
        ('uniqueName', models.CharField(unique=True, max_length=100)), ('shortDesc', models.CharField(max_length=200)),
        ('price', models.DecimalField(max_digits=10, decimal_places=2)),
        ('created_at', models.DateTimeField(auto_now_add=True)), ('updated_at', models.DateTimeField(auto_now=True)), ],
                                         options={}, bases=(models.Model,), ), ]
