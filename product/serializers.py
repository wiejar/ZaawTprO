# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import serializers
from product.models import Product, ProductDescription, Category
from picture4product.serializers import Picture4ProductSerializers


class CategorySerializers(serializers.ModelSerializer):
    """
    Serializer to serialize pictures to product relation
    """
    class Meta:
        """
        Contain definition of CategorySerializers
        """
        model = Category


class ProductSerializers(serializers.ModelSerializer):
    """
    Serializer to serialize selected field from product
    serialize fields: id, category, name, shortDesc, price, available, uniqueName, pictures
    """
    pictures = Picture4ProductSerializers(many=True, read_only=True, required=False)
    category = CategorySerializers(many=False, read_only=True, required=False)

    class Meta:
        """
        Contain definition of ProductSerializers
        """
        model = Product

        fields = ('id', 'category', 'name', 'shortDesc', 'price', 'available', 'uniqueName', 'pictures',)
        read_only_fields = ('id', 'created_at', 'updated_at')


class ProductDescriptionSerializers(serializers.ModelSerializer):
    """
    Serializer to serialize product description
    """

    class Meta:
        """
        Contain definition of ProductDescriptionSerializers
        """
        model = ProductDescription


class FullProductSerializers(serializers.ModelSerializer):
    """
    Serializer to serialize full product information, addition add product specification and pictures
    """
    pictures = Picture4ProductSerializers(many=True, read_only=True, required=False)
    detailDesc = ProductDescriptionSerializers(many=False, read_only=True, required=False)
    # productSpecification = ProductSpecificationModelSerializer(many=True, read_only=True, required=False)
    category = CategorySerializers(many=False, read_only=True, required=False)

    class Meta:
        """
        Contain definition of FullProductSerializers
        """
        model = Product

        fields = ('id', 'category', 'name', 'shortDesc', 'price', 'available', 'uniqueName', 'pictures', 'detailDesc',
                  'productSpecification', )
        read_only_fields = ('id', 'created_at', 'updated_at')
