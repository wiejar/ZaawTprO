# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [('product', '0001_initial'), ('picture', '0001_initial'), ]

    operations = [migrations.CreateModel(name='Picture4Product', fields=[
        ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        ('picture', models.ForeignKey(to='picture.Picture')), ('product', models.ForeignKey(to='product.Product')), ],
                                         options={}, bases=(models.Model,), ), ]
