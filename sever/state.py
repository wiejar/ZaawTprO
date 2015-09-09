# -*- coding: utf-8 -*-

__author__ = 'slawek'
from abc import ABCMeta, abstractmethod
import random


class State:
    """
     Allows an object to change its behavior when its internal state changes.
    """

    __metaclass__ = ABCMeta

    @abstractmethod
    def next(self):
        None

    @abstractmethod
    def get_name(self):
        None


class StateNew(State):
    """
     Defines state: new.
    """

    ## This method goes into next product .
    # @param self The object pointer
    # @type: Object
    # @return Information about product which is going to be paid.
    # @rtype: StateWaitForPaid
    def next(self):
        return StateWaitForPaid()

    ## This method gives information about product state in basket.
    # @param self The object pointer
    # @type: Object
    # @return Word 'New'.
    # @rtype: String
    def get_name(self):
        return 'New'


class StateWaitForPaid(State):
    """
     Defines state: state wait for paid.
    """

    ## This method goes into next product .
    # @param self The object pointer
    # @type: Object
    # @return Information about state status.
    # @rtype: StateCompleted or StateCanceled
    def next(self):
        if random.randrange(9) < 6:
            return StateCompleted()
        else:
            return StateCanceled()

    ## This method gives information about payment status.
    # @param self The object pointer
    # @type: Object
    # @return Word 'WaitMoney'.
    # @rtype: String
    def get_name(self):
        return 'WaitMoney'


class StateCanceled(State):
    """
     Defines state status: state canceled.
    """

    ## This method goes into next product .
    # @param self The object pointer
    # @type: Object
    # @return None.
    # @rtype: None
    def next(self):
        None

    ## This method gives information about payment status.
    # @param self The object pointer
    # @type: Object
    # @return Word 'Canceled'.
    # @rtype: String
    def get_name(self):
        return 'Canceled'


class StateCompleted(State):
    """
     Defines state status: state completed.
    """

    ## This method goes into next product .
    # @param self The object pointer
    # @type: Object
    # @return None.
    # @rtype: None
    def next(self):
        None

    ## This method gives information about payment status.
    # @param self The object pointer
    # @type: Object
    # @return Word 'Completed'.
    # @rtype: String
    def get_name(self):
        return 'Completed'