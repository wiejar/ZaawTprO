# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import viewsets
from rest_framework.response import Response

from product.models import Product, Category
from product.serializers import ProductSerializers, FullProductSerializers, CategorySerializers


class SingleProductViewSet(viewsets.ModelViewSet):
    """
    View - get full data about single product.
    Product is selecting on the base 'uniqueName' field.
    """
    lookup_field = 'uniqueName'
    queryset = Product.objects.all()
    serializer_class = FullProductSerializers


class ProductViewSet(viewsets.ModelViewSet):
    """
    View - get simple data about products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializers


class CategoryProductViewSet(viewsets.ModelViewSet):
    """
    View - get simple data about products related to selected category.
    """
    queryset = Product.objects.all()
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