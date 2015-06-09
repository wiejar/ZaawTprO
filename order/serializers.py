# -*- coding: utf-8 -*-

__author__ = 'Jarek'

from rest_framework import serializers
from order.models import Order
from authentication.serializers import AccountSerializer
from product.serializers import ProductSerializers


class OrderSerializers(serializers.ModelSerializer):
    owner = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Order

        fields = ('id','owner','shippingAddress', 'postalCode', 'city' , 'totalprice','created_at','updated_at',)
        read_only_fields = ('id','created_at','updated_at')


class ProductOrderSerializers(serializers.ModelSerializer):
    order = OrderSerializers(many=False, read_only=True, required=True)
    product = ProductSerializers(many=True, read_only=True, required=True)

    fields = ('id', 'category', 'name', 'shortDesc', 'price', 'uniqueName', 'pictures',)
    read_only_fields = ('id', 'created_at', 'updated_at')