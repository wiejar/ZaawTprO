# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import serializers
from product.models import Product, ProductDescription, Category
from picture4product.serializers import Picture4ProductSerializers
from productSpecification.serializers import ProductSpecificationModelSerializer


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category


class ProductSerializers(serializers.ModelSerializer):
    pictures = Picture4ProductSerializers(many=True, read_only=True, required=False)
    category = CategorySerializers(many=False, read_only=True, required=False)

    class Meta:
        model = Product

        fields = ('id', 'category', 'name', 'shortDesc', 'price', 'available', 'uniqueName', 'pictures',)
        read_only_fields = ('id', 'created_at', 'updated_at')


class ProductDescriptionSerializers(serializers.ModelSerializer):
    class Meta:
        model = ProductDescription

        fields = ('url',)


class FullProductSerializers(serializers.ModelSerializer):
    pictures = Picture4ProductSerializers(many=True, read_only=True, required=False)
    detailDesc = ProductDescriptionSerializers(many=False, read_only=True, required=False)
    productSpecification = ProductSpecificationModelSerializer(many=True, read_only=True, required=False)
    category = CategorySerializers(many=False, read_only=True, required=False)

    class Meta:
        model = Product

        fields = ('id', 'category', 'name', 'shortDesc', 'price', 'available', 'uniqueName', 'pictures', 'detailDesc',
                  'productSpecification', )
        read_only_fields = ('id', 'created_at', 'updated_at')
