# -*- coding: utf-8 -*-

__author__ = 'Jarek'

from rest_framework import serializers
from orders.models import Order, State, ProductOrder
from authentication.serializers import AccountSerializer
from product.serializers import ProductSerializers


class StateSerializers(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('id', 'name',)


class OrderSerializers(serializers.ModelSerializer):
    owner = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Order

        fields = ('id', 'state','owner','shippingAddress', 'postalCode', 'city' , 'totalprice', 'additional_information','created_at','updated_at',)
        read_only_fields = ('id','created_at','updated_at')


class ProductOrderSerializers(serializers.ModelSerializer):
    order = OrderSerializers(many=False, read_only=False, required=True)
    product = ProductSerializers(many=True, read_only=False, required=True)

    class Meta:
        model = ProductOrder

        fields = ('id', 'category', 'name', 'shortDesc', 'price', 'uniqueName', 'pictures',)
        read_only_fields = ('id', 'created_at', 'updated_at')
