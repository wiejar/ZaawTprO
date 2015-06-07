# -*- coding: utf-8 -*-

from django.db import models

__author__ = 'slawek'


class ProductDescription(models.Model):
    url = models.CharField(max_length=200)


class Category(models.Model):
    name = models.CharField(max_length=50)


class Product(models.Model):
    category = models.ForeignKey(Category, null=False, default=1)
    name = models.CharField(max_length=200)
    uniqueName = models.CharField(max_length=100, unique=True)
    shortDesc = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    detailDesc = models.ForeignKey(ProductDescription, null=True, blank=True, default=None)
