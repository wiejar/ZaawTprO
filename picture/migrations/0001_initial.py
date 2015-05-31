# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = []

    operations = [migrations.CreateModel(name='Picture', fields=[
        ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
        ('url', models.CharField(blank=True, max_length=100)), ('desc', models.CharField(blank=True, max_length=50)), ],
                                         options={}, bases=(models.Model,), ), ]
