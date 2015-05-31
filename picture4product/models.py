# -*- coding: utf-8 -*-

__author__ = 'slawek'

from django.db import models

from picture.models import Picture
from product.models import Product


# Create your models here.
class Picture4Product(models.Model):
    picture = models.ForeignKey(Picture)
    product = models.ForeignKey(Product, related_name='pictures')