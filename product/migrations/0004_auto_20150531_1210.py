# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [('product', '0003_auto_20150531_1208'), ]

    operations = [migrations.AlterField(model_name='product', name='detailDesc',
                                        field=models.ForeignKey(blank=True, null=True, to='product.ProductDescription',
                                                                default=None), preserve_default=True, ), ]
