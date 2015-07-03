from _ast import Or

__author__ = 'Jarek'
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from orders.models import Order, ProductOrder
from orders.serializers import OrderSerializers, ProductOrderSerializers


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('owner').order_by('-created_at')
    serializer_class = OrderSerializers

    def perform_create(self, serializer):
        instance = serializer.save(owner=self.request.user)
        return super(OrderViewSet, self).perform_create(serializer)


class ProductOrderViewSet(viewsets.ModelViewSet):
    queryset = ProductOrder.objects.select_related('order')
    serializer_class = ProductOrderSerializers
    lookup_field = 'order_id'

    def list(self, request, order_pk=None):
        queryset = self.queryset.filter(order__id=order_pk).all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        instance = serializer.save()
        return super(ProductOrderViewSet, self).perform_create(serializer)
