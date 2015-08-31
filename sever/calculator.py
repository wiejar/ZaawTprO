# -*- coding: utf-8 -*-

__author__ = 'slawek'

from abc import ABCMeta, abstractmethod
from decimal import Decimal, ROUND_UP


class Calculator:
    __metaclass__ = ABCMeta

    @abstractmethod
    def calculate_price(self, price):
        None

    @abstractmethod
    def max_quantity(self):
        None

    def prepare_price(self, price, multiply):
        return (price * multiply).quantize(Decimal('.01'), rounding=ROUND_UP)


class CompanyCalculator(Calculator):
    def calculate_price(self, price):
        return self.prepare_price(self, price, Decimal('0.8'))

    def max_quantity(self):
        return 10


class NormalCalculator(Calculator):
    def calculate_price(self, price):
        return self.prepare_price(self, price, Decimal('0.9'))

    def max_quantity(self):
        return 4