# -*- coding: utf-8 -*-

__author__ = 'slawek'
from abc import ABCMeta, abstractmethod
import random


class State:
    __metaclass__ = ABCMeta

    @abstractmethod
    def next(self):
        None

    @abstractmethod
    def get_name(self):
        None


class StateNew(State):
    def next(self):
        return StateWaitForPaid()

    def get_name(self):
        return 'New'


class StateWaitForPaid(State):
    def next(self):
        if random.randrange(9) < 6:
            return StateCompleted()
        else:
            return StateCanceled()

    def get_name(self):
        return 'WaitMoney'


class StateCanceled(State):
    def next(self):
        None

    def get_name(self):
        return 'Canceled'


class StateCompleted(State):
    def next(self):
        None

    def get_name(self):
        return 'Completed'