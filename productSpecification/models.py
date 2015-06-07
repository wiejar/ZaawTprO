# -*- coding: utf-8 -*-

from django.db import models
from product.models import Product
from django.core import serializers
from managers.managers import InheritanceManager

__author__ = 'slawek'


class ProductSpecification(models.Model):
    product = models.ForeignKey(Product, related_name='productSpecification')
    child = InheritanceManager()

    def get_child(self):
        return serializers.serialize("python", [ProductSpecification.child.get_subclass(id=self.id)])


class Monitor(ProductSpecification):
    diagonal = models.DecimalField(max_digits=3, decimal_places=1)


class HardDrive(ProductSpecification):
    storageInGB = models.DecimalField(max_digits=10, decimal_places=0)