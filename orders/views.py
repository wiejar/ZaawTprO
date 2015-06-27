from _ast import Or

__author__ = 'Jarek'
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from orders.models import Order, ProductOrder
from orders.serializers import OrderSerializers, ProductOrderSerializers
from orders.permissions import IsOwnerOfOrder


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('owner').order_by('-created_at')
    serializer_class = OrderSerializers

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        else:
            return (permissions.IsAuthenticated(), IsOwnerOfOrder(),)

    def perform_create(self, serializer):
        instance = serializer.save(owner=self.request.user)
        return super(OrderViewSet, self).perform_create(serializer)


class ProductOrderViewSet(viewsets.ModelViewSet):
    queryset = ProductOrder.objects.all()
    serializer_class = ProductOrderSerializers

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        else:
            return (permissions.IsAuthenticated(), )

    def perform_create(self, serializer):
        instance = serializer.save()
        return super(ProductOrderViewSet, self).perform_create(serializer)
