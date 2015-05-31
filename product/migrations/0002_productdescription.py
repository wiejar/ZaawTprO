# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [('product', '0001_initial'), ]

    operations = [migrations.CreateModel(name='ProductDescription', fields=[
        ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
        ('url', models.CharField(max_length=200)),
        ('product', models.ForeignKey(related_name='detailDesc', to='product.Product')), ], options={},
                                         bases=(models.Model,), ), ]
