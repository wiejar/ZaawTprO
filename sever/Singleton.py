# -*- coding: utf-8 -*-

__author__ = 'slawek'

from sever.calculator import CompanyCalculator, NormalCalculator
from sever.util import get_user_param_from_request_or_none


class Singleton():
    class __OnlyOne:
        def __init__(self):
            self.val = None

        def __str__(self):
            return repr(self) + repr(self.val)

        def get_calculator(self, request):
            if get_user_param_from_request_or_none(request, 'tax_identification_number'):
                return CompanyCalculator
            else:
                return NormalCalculator

    instance = None

    def __new__(cls):  # __new__ always a classmethod
        if not Singleton.instance:
            Singleton.instance = Singleton.__OnlyOne()
        return Singleton.instance

    def __getattr__(self, name):
        return getattr(self.instance, name)

    def __setattr__(self, name):
        return setattr(self.instance, name)
