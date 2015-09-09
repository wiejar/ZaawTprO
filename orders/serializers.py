# -*- coding: utf-8 -*-

__author__ = 'Jarek'

from rest_framework import serializers
from orders.models import Order, ProductOrder
from authentication.serializers import AccountSerializer
from product.models import Product
from product.serializers import BaseProductSerializer


class ProductOrderSerializers(serializers.ModelSerializer):
    """
    Serializer to serialize products related to order.
    serialize fields: 'id', 'order', 'product',  'price', 'quantity'
    """
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), required=False)
    serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        """
        Definition of ProductOrderSerializers
        """
        model = ProductOrder

        fields = ('id', 'order', 'product',  'price', 'quantity')


class AdminOrderSerializers(BaseProductSerializer):
    """
    Serializer to manage statuses of orders.
    serialize fields: 'id', 'state', 'owner', 'shippingAddress', 'postalCode', 'city', 'totalprice', 'additional_information',
        'created_at', 'last_change', 'productOrder'
    """
    class Meta:
        """
        Definition of AdminOrderSerializers
        """
        model = Order

        fields = (
            'id', 'state', 'owner', 'shippingAddress', 'postalCode', 'city', 'totalprice', 'additional_information',
            'created_at', 'last_change', 'productOrder',)
        read_only_fields = (
            'owner', 'shippingAddress', 'postalCode', 'city', 'totalprice', 'additional_information', 'created_at',
            'last_change', 'productOrder',)

    ## Method which allows to change state of order
    # @return updated serialized object
    # @rtype: Object
    def update(self, instance, validated_data):
        instance.state = validated_data['state']
        instance.save()
        return instance


class OrderSerializers(BaseProductSerializer):
    """
    Serializer used to serialize whole orders
    serialize fields: 'id', 'state', 'owner', 'shippingAddress', 'postalCode', 'city', 'totalprice', 'additional_information',
        'created_at', 'last_change', 'productOrder'
    """
    owner = AccountSerializer(required=False, read_only=False)
    productOrder = ProductOrderSerializers(many=True)

    class Meta:
        """
        Definition of OrderSerializers
        """
        model = Order

        fields = (
            'id', 'state', 'owner', 'shippingAddress', 'postalCode', 'city', 'totalprice', 'additional_information',
            'created_at', 'last_change', 'productOrder',)
        read_only_fields = ('id', 'created_at', 'last_change', 'owner',)

    ## Method which creates productOeders object related to order
    # @return updated serialized object
    # @rtype: Order
    def create(self, validated_data):
        productOrder_data = validated_data.pop('productOrder')
        order = Order.objects.create(**validated_data)

        for productOrders in productOrder_data:
            productOrders['price'] = productOrders['price']
            ProductOrder.objects.create(order=order, **productOrders)
        return order

    ## Method which allows to update order parameters
    # @return updated serialized object
    # @rtype: Object
    def update(self, instance, validated_data):
        instance.state = validated_data['state']
        instance.shippingAddress = validated_data['shippingAddress']
        instance.postalCode = validated_data['postalCode']
        instance.city = validated_data['city']
        instance.totalprice = validated_data['totalprice']
        instance.additional_information = validated_data['additional_information']
        instance.save()

        if id in validated_data:

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