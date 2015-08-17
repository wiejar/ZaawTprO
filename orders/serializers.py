# -*- coding: utf-8 -*-

__author__ = 'Jarek'

from rest_framework import serializers
from orders.models import Order, State, ProductOrder
from authentication.serializers import AccountSerializer
from product.models import Product


class StateSerializers(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('id', 'name',)


class ProductOrderSerializers(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), required=False)
    serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = ProductOrder

        fields = ('id', 'order', 'product',  'price', 'quantity')


class OrderSerializers(serializers.ModelSerializer):
    owner = AccountSerializer(required=False, read_only=False)
    productOrder = ProductOrderSerializers(many=True)

    class Meta:
        model = Order

        fields = (
            'id', 'state', 'owner', 'shippingAddress', 'postalCode', 'city', 'totalprice', 'additional_information',
            'created_at', 'last_change', 'productOrder',)
        read_only_fields = ('id', 'created_at', 'last_change', 'owner',)

    def create(self, validated_data):
        productOrder_data = validated_data.pop('productOrder')
        order = Order.objects.create(**validated_data)

        for productOrders in productOrder_data:
            ProductOrder.objects.create(order=order, **productOrders)
        return order

    def update(self, instance, validated_data):
        instance.state = validated_data['state']
        instance.shippingAddress = validated_data['shippingAddress']
        instance.postalCode = validated_data['postalCode']
        instance.city = validated_data['city']
        instance.totalprice = validated_data['totalprice']
        instance.additional_information = validated_data['additional_information']
        instance.save();

        if id in validated_data:

            # nie wiem czy dziala -prawdidlowy update
            productOrder_data = validated_data.pop('productOrder')
            page_ids = [item['id'] for item in productOrder_data]
            for page in instance.productOrder:
                if page.product not in page_ids:
                    page.delete()

            # Create or update page instances that are in the request
            for item in productOrder_data:
                page = ProductOrder(id=item['id'], product=item['product'].id, price=item['price'],
                                    quantity=item['quantity'], order=instance)
                page.save()

        return instance