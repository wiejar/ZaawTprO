# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import serializers
from productSpecification.models import ProductSpecification


class ProductSpecificationModelSerializer(serializers.ModelSerializer):
    # convert_user = serializers.HyperlinkedIdentityField(view_name='child')
    token = serializers.SerializerMethodField('get_child')

    def get_child(self, obj):
        return obj.get_child()

    class Meta:
        model = ProductSpecification