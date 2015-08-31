from _ast import Or

__author__ = 'Jarek'
from rest_framework import viewsets
from rest_framework.response import Response
from orders.models import Order, ProductOrder
from orders.serializers import OrderSerializers, ProductOrderSerializers
from sever.util import get_user_param_from_request_or_none
from product.views import BaseProductViewSet


class OrderViewSet(BaseProductViewSet):
    queryset = Order.objects
    serializer_class = OrderSerializers

    def perform_create(self, serializer):
        instance = serializer.save(owner=self.request.user)
        return super(OrderViewSet, self).perform_create(serializer)

    def list(self, request):
        user_id = get_user_param_from_request_or_none(request, 'id')
        queryset = self.queryset.filter(owner=user_id).all().order_by('-created_at')
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class ProductOrderViewSet(viewsets.ModelViewSet):
    queryset = ProductOrder.objects
    serializer_class = ProductOrderSerializers
    lookup_field = 'order_id'

    def list(self, request, order_pk=None):
        queryset = self.queryset.filter(order__id=order_pk).all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        instance = serializer.save()
        return super(ProductOrderViewSet, self).perform_create(serializer)
