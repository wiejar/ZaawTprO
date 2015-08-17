# -*- coding: utf-8 -*-

__author__ = 'slawek'

from django.db import models

from picture.models import Picture
from product.models import Product


class Picture4Product(models.Model):
    """
    DataBase model of relation picture to product.
    """
    picture = models.ForeignKey(Picture)
    product = models.ForeignKey(Product, related_name='pictures')