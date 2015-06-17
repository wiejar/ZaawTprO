__author__ = 'Jarek'
from rest_framework import permissions


class IsOwnerOfOrder(permissions.BasePermission):
    def has_object_permission(self, request, view, order):
        return True
        #TODO:dorobic walidacje usera
        # if request.user:
        #     return request.user == orders.owner
        # else:
        #     return False