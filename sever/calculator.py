# -*- coding: utf-8 -*-

__author__ = 'slawek'

from abc import ABCMeta, abstractmethod
from decimal import Decimal, ROUND_UP


class Calculator:
    """
     Calculate data
    """
    __metaclass__ = ABCMeta

    ## This method return price for user
    @abstractmethod
    def calculate_price(self, price):
        None

    ## This method return maximum quantity of single product
    @abstractmethod
    def max_quantity(self):
        None

    def prepare_price(self, price, multiply):
        return (price * multiply).quantize(Decimal('.01'), rounding=ROUND_UP)


class CompanyCalculator(Calculator):
    """
     Calculate data  for company
    """

    ## This method return price for user
    def calculate_price(self, price):
        return self.prepare_price(self, price, Decimal('0.8'))

    ## This method return maximum quantity of single product
    def max_quantity(self):
        return 10


class NormalCalculator(Calculator):
    """
     Calculate data  for NORMAL USER
    """

    ## This method return price for user
    def calculate_price(self, price):
        return self.prepare_price(self, price, Decimal('0.9'))

    ## This method return maximum quantity of single product
    def max_quantity(self):
        return 4