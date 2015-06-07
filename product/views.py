# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import viewsets, permissions
from rest_framework.response import Response

from product.serializers import ProductSerializers, FullProductSerializers, CategorySerializers
from product.models import Product, Category


class SingleProductViewSet(viewsets.ModelViewSet):
    lookup_field = 'uniqueName'
    queryset = Product.objects.all()
    serializer_class = FullProductSerializers

    def get_permissions(self):
        return (permissions.AllowAny(), )


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers

    def get_permissions(self):
        return (permissions.AllowAny(),)


class CategoryProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductSerializers

    def get_permissions(self):
        return (permissions.AllowAny(),)

    def list(self, request, category_pk=None):
        queryset = self.queryset.filter(category__name=category_pk).all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers

    def get_permissions(self):
        return (permissions.AllowAny(),)