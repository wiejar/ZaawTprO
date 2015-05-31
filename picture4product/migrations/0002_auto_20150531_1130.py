# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [('picture4product', '0001_initial'), ]

    operations = [migrations.AlterField(model_name='picture4product', name='product',
                                        field=models.ForeignKey(related_name='pictures', to='product.Product'),
                                        preserve_default=True, ), ]
