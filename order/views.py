from _ast import Or

__author__ = 'Jarek'
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from order.models import Order
from order.serializers import OrderSerializers
from order.permissions import IsOwnerOfOrder


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.order_by('-created_at')
    serializer_class = OrderSerializers

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        else:
            return (permissions.IsAuthenticated(), IsOwnerOfOrder(),)

def perform_create(self, serializer):
    instance = serializer.save(owner=self.request.user)
    return super(OrderViewSet, self).perform_create(serializer)


class AccountOrdersViewSet(viewsets.ViewSet):
    queryset = Order.objects.select_related('owner').all()
    serializer_class = OrderSerializers

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(owner=account_username)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

