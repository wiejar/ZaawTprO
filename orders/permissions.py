__author__ = 'Jarek'
from rest_framework import permissions


class IsOwnerOfOrder(permissions.BasePermission):
    def has_object_permission(self, request, view, order):
        #TODO:sprawdzic walidacje usera
        if request.user:
            return request.user == order.owner
        else:
            return False