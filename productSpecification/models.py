"""
The mod module
"""
from django.db import models
from product.models import Product
from django.core import serializers
from managers.managers import InheritanceManager

__author__ = 'slawek'


class ProductSpecification(models.Model):
    """
    DataBase model of basic product specification.
    """
    product = models.ForeignKey(Product, related_name='productSpecification')
    child = InheritanceManager()

    ##This method returns the serialized object subclasses.
    # @return serialized object subclasses
    # @rtype: Object
    def get_child(self):
        return serializers.serialize("python", [ProductSpecification.child.get_subclass(id=self.id)])


class Monitor(ProductSpecification):
    """
    DataBase model: specification of monitors products.
    """
    diagonal = models.DecimalField(max_digits=3, decimal_places=1)


class HardDrive(ProductSpecification):
    """
    DataBase model: specification of hard drive.
    """
    storageInGB = models.DecimalField(max_digits=10, decimal_places=0)