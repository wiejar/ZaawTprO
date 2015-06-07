# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import serializers
from productSpecification.models import ProductSpecification


class GeneralModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = None

    def to_representation(self, instance):
        self.change_meta_model_instance(instance)
        ret = super(serializers.ModelSerializer, self).to_representation(instance)
        return ret

    def change_meta_model_instance(self, instance):
        self.Meta.model = type(instance)
        super(GeneralModelSerializer, self).__init__(instance=instance)


class ProductSpecificationModelSerializer(serializers.ModelSerializer):
    # convert_user = serializers.HyperlinkedIdentityField(view_name='child')
    token = serializers.SerializerMethodField('get_child')
    # child = GeneralModelSerializer(many=True, source='child')
    def get_child(self, obj):
        return obj.get_child()

    class Meta:
        model = ProductSpecification