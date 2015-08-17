# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import serializers
from productSpecification.models import ProductSpecification


class ProductSpecificationModelSerializer(serializers.ModelSerializer):
    """
    Serializer to serialize specification of product
    """
    token = serializers.SerializerMethodField('get_child')

    ## Delegate to Model method which returns the serialized object subclasses.
    # @return serialized object subclasses
    # @rtype: Object
    def get_child(self, obj):
        return obj.get_child()

    class Meta:
        """
        Contain definition of ProductSpecificationModelSerializer
        """
        model = ProductSpecification