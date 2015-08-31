# -*- coding: utf-8 -*-

__author__ = 'slawek'

from sever.calculator import CompanyCalculator, NormalCalculator
from sever.util import get_user_param_from_request_or_none
from sever.state import StateCompleted, StateWaitForPaid, StateCanceled, StateNew, State


class Singleton():
    class __OnlyOne:
        stateMap = {}

        def __init__(self):
            self.val = None
            self.__add_to_map__(StateCanceled())
            self.__add_to_map__(StateCompleted())
            self.__add_to_map__(StateNew())
            self.__add_to_map__(StateWaitForPaid())

        def __str__(self):
            return repr(self) + repr(self.val)

        def get_calculator(self, request):
            if get_user_param_from_request_or_none(request, 'tax_identification_number'):
                return CompanyCalculator
            else:
                return NormalCalculator

        def get_next_state(self, curr_state):
            state = self.stateMap.get(curr_state, None)
            if not state:
                state = self.stateMap['New']
                return state.get_name()
            if state.next():
                state = state.next()
                return state.get_name()
            else:
                return state.get_name()

        def __add_to_map__(self, state):
            self.stateMap[state.get_name()] = state

    instance = __OnlyOne()

    def __new__(cls):  # __new__ always a classmethod
        if not Singleton.instance:
            Singleton.instance = Singleton.__OnlyOne()
        return Singleton.instance

    def __getattr__(self, name):
        return getattr(self.instance, name)

    def __setattr__(self, name):
        return setattr(self.instance, name)
