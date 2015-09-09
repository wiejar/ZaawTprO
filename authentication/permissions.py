# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import permissions


class IsAccountOwner(permissions.BasePermission):
    """
     If there is a user associated with the current request,
     we check whether that user is the same object as account.
    """

    ## This method checks whether user is the same object as account.
    ## If there is no user associated with this request, we simply return False.
    # @param self The object pointer
    # @type: Object
    # @param request Request for a permission
    # @type: Object
    # @param view View, which is thing of the request
    # @type: Object
    # @param account Account, which is thing of the request
    # @type: Object
    # @return Information about permission
    # @rtype: Boolean
    def has_object_permission(self, request, view, account):
        if request.user:
            return account == request.user
        return False
