from _ast import Or

__author__ = 'Jarek'
from rest_framework import viewsets
from rest_framework.response import Response
from orders.models import Order, ProductOrder
from orders.serializers import OrderSerializers, ProductOrderSerializers, AdminOrderSerializers
from sever.util import get_user_param_from_request_or_none
from product.views import BaseProductViewSet
from sever.Singleton import Singleton


class OrderViewSet(BaseProductViewSet):
    """
    View - get full data about orders.
    Product is selecting on the base 'uniqueName' field.
    """
    queryset = Order.objects
    serializer_class = OrderSerializers

    ## This method is used to create order
    # @param self The object pointer
    # @type: OrderViewSet
    # @param serializer Serializer to this view
    # @type: Serializer
    # @return super call method
    # @rtype: Response
    def perform_create(self, serializer):
        instance = serializer.save(owner=self.request.user)
        return super(OrderViewSet, self).perform_create(serializer)

    ## This method is used to return serialized list of orders
    ## related to logged user
    # @param self The object pointer
    # @type: OrderViewSet
    # @param request Request to this view
    # @type: Request
    # @return serialized list of objects
    # @rtype: Response
    def list(self, request):
        user_id = get_user_param_from_request_or_none(request, 'id')
        queryset = self.queryset.filter(owner=user_id).all().order_by('-created_at')
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class AdminOrderView(viewsets.ModelViewSet):
    """
    Admin View - get full data about orders
    """
    queryset = Order.objects
    serializer_class = AdminOrderSerializers
    lookup_field = 'id'

    ## This method is used to update state of order
    # @param self The object pointer
    # @type: AdminOrderView
    # @param serializer
    # @type: Serializer for AdminOrder
    def perform_update(self, serializer):
        serializer.validated_data['state'] = Singleton.instance.get_next_state(serializer.data['state'])
        instance = serializer.save()

    ## This method is used to return serialized list of orders
    ## is logged user is admin
    # @param self The object pointer
    # @type: AdminOrderView
    # @param request Request to this view
    # @type: Request
    # @return serialized list of objects
    # @rtype: Response
    def list(self, request):
        is_admin = get_user_param_from_request_or_none(request, 'is_admin')
        if is_admin:
            queryset = self.queryset.all().order_by('-created_at')
        else:
            user_id = get_user_param_from_request_or_none(request, 'id')
            queryset = self.queryset.filter(owner=user_id).all().order_by('-created_at')

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class ProductOrderViewSet(viewsets.ModelViewSet):
    """
    View - get full data about single productOrder item
    Products are matched on 'order_id' field.
    """
    queryset = ProductOrder.objects
    serializer_class = ProductOrderSerializers
    lookup_field = 'order_id'

    ## This method is used to return serialized list of project objects
    # @param self The object pointer
    # @type: ProductOrderViewSet
    # @param request Request to this view
    # @type: Request
    # @param order_pk Order pk
    # @type: Number
    # @return serialized list of objects
    # @rtype: Response
    def list(self, request, order_pk=None):
        queryset = self.queryset.filter(order__id=order_pk).all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    ## This method is used to create productOrder
    # @param self The object pointer
    # @type: ProductOrderViewSet
    # @param serializer Serializer to this view
    # @type: Serializer
    # @return super call method
    # @rtype: Response
    def perform_create(self, serializer):
        instance = serializer.save()
        return super(ProductOrderViewSet, self).perform_create(serializer)
