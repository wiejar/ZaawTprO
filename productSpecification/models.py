# -*- coding: utf-8 -*-

from django.db import models
from product.models import Product
from django.core import serializers
from managers.managers import InheritanceManager

__author__ = 'slawek'


class RealInstaceProvider(object):
    def get_real_instance(self):
        """
        Makes a SQL sentence which does the JOIN with its real model class
        """

        if hasattr(self, '_real_instance'):  # try looking in our cache
            return self._real_instance
        subclasses = self.__class__.__subclasses__()
        if not subclasses:  # already real_instance
            real_instance = getattr(self, self.__class__.__name__, self)
            self._real_instance = real_instance
            return real_instance
        else:
            subclasses_names = [cls.__name__.lower() for cls in subclasses]
            for subcls_name in subclasses_names:
                if hasattr(self, subcls_name):
                    self._real_instance = getattr(self, subcls_name, self).get_real_instance()
                    return self._real_instance
            self._real_instance = self
            return self


class ProductSpecification(models.Model, RealInstaceProvider):
    product = models.ForeignKey(Product, related_name='productSpecification')
    child = InheritanceManager()

    def get_child(self):
        return serializers.serialize("python", [ProductSpecification.child.get_subclass(id=self.id)])


class Monitor(ProductSpecification):
    diagonal = models.DecimalField(max_digits=3, decimal_places=1)


class HardDrive(ProductSpecification):
    storageInGB = models.DecimalField(max_digits=10, decimal_places=0)