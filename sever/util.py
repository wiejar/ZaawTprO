# -*- coding: utf-8 -*-

__author__ = 'slawek'

## This method search param in request user params
# @param request Request in which search param
# @type: Request
# @param param_name searching param
# @type: String
# @return Param value or None
# @rtype: Object
def get_user_param_from_request_or_none(request, param_name):
    if request and hasattr(request, 'user') and request.user and hasattr(request.user, param_name):
        return getattr(request.user, param_name)
    else:
        return None