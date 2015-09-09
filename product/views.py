# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import viewsets
from rest_framework.response import Response
from abc import ABCMeta

from product.models import Product, Category
from product.serializers import ProductSerializers, FullProductSerializers, CategorySerializers
from sever.Singleton import Singleton


class BaseProductViewSet(viewsets.ModelViewSet):
    """
    View - base class for view which get data about product.
    """
    __metaclass_ = ABCMeta
    queryset = Product.objects.all()

    ## This method return serializer with set calculator. [Strategy design pattern]
    # @param self The object pointer
    # @type: BaseProductViewSet
    # @return Serializer with set filed
    # @rtype: Serializer
    def get_serializer_class(self):
        serializer = super(BaseProductViewSet, self).get_serializer_class()
        serializer.calculator = Singleton().get_calculator(self.request)
        return serializer


class SingleProductViewSet(BaseProductViewSet):
    """
    View - get full data about single product.
    Product is selecting on the base 'uniqueName' field.
    """
    lookup_field = 'uniqueName'
    serializer_class = FullProductSerializers


class ProductViewSet(BaseProductViewSet):
    """
    View - get simple data about products.
    """
    serializer_class = ProductSerializers


class CategoryProductViewSet(BaseProductViewSet):
    """
    View - get simple data about products related to selected category.
    """
    serializer_class = ProductSerializers

    ## This method is used to return serialized list of project objects ]
    ## related to selected category
    # @param self The object pointer
    # @type: CategoryProductViewSet
    # @param request Request to this view
    # @type: Request
    # @param category_pk Category pk
    # @type: Number
    # @return serialized list of objects
    # @rtype: Response
    def list(self, request, category_pk=None):
        queryset = self.queryset.filter(category__name=category_pk).all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CategoriesViewSet(viewsets.ModelViewSet):
    """
    View - get data about products category.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializers