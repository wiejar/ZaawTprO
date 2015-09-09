# -*- coding: utf-8 -*-

__author__ = 'slawek'

from sever.calculator import CompanyCalculator, NormalCalculator
from sever.util import get_user_param_from_request_or_none
from sever.state import StateCompleted, StateWaitForPaid, StateCanceled, StateNew, State


class Singleton():
    """
     Ensure a class has only one instance.
    """

    class __OnlyOne:
        """
         Ensure a class has only one instance.
        """

        stateMap = {}

        ## This method initiates state of the product .
        # @param self The object pointer
        # @type: Object
        def __init__(self):
            self.val = None
            self.__add_to_map__(StateCanceled())
            self.__add_to_map__(StateCompleted())
            self.__add_to_map__(StateNew())
            self.__add_to_map__(StateWaitForPaid())

        ## This method gives information about order and it's value .
        # @param self The object pointer
        # @type: Object
        # @return Information about order and it's value.
        # @rtype: Object
        def __str__(self):
            return repr(self) + repr(self.val)

        ## This method choose properly calculator to calculate price of order .
        # @param self The object pointer
        # @type: Object
        # @param request Object of the comparison
        # @type: Object
        # @return Information which calculator will be used.
        # @rtype: CompanyCalculator or NormalCalculator
        def get_calculator(self, request):
            if get_user_param_from_request_or_none(request, 'tax_identification_number'):
                return CompanyCalculator
            else:
                return NormalCalculator

        ## This method switches into next state .
        # @param self The object pointer
        # @type: Object
        # @param curr_state Current state of the order
        # @type: Object
        # @return Information about which state will be used as next one.
        # @rtype: String
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

        ## This method adds another state to the map.
        # @param self The object pointer
        # @type: Object
        # @param state State, which will be added to the map.
        # @type: State
        def __add_to_map__(self, state):
            self.stateMap[state.get_name()] = state

    instance = __OnlyOne()

    ## This method defines classmethod.
    # @param cls The object pointer
    # @type: Object
    # @return Instance of the singleton class.
    # @rtype: Singleton
    def __new__(cls):  # __new__ always a classmethod
        if not Singleton.instance:
            Singleton.instance = Singleton.__OnlyOne()
        return Singleton.instance

    ## This method gives attribute of the singleton instance.
    # @param self The object pointer
    # @type: Object
    # @param name Instance name
    # @type: singleton
    # @return attribute of the singleton class.
    # @rtype: Object
    def __getattr__(self, name):
        return getattr(self.instance, name)

    ## This method sets attribute of the singleton instance.
    # @param self The object pointer
    # @type: Object
    # @param name Instance name
    # @type: singleton
    # @return attribute of the singleton class.
    # @rtype: Object
    def __setattr__(self, name):
        return setattr(self.instance, name)
