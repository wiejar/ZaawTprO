# -*- coding: utf-8 -*-
__author__ = 'Jarek'

from django.db import models
from authentication.models import Account
from product.models import Product
from abc import ABCMeta


class State(models.Model, metaclass=ABCMeta):
    name = models.CharField(max_length=20)

    def __new__(cls, *args, **kwargs):
        raise Exception("Cannot create object State!")

class StateAccepted(State):
    def __init__(self):
        self.name = "Accepted"

    @classmethod
    def go(cls, order):
        order._state = StateWaitingForPayment

    @classmethod
    def back(cls, order):
        order._state = StateError

class StateWaitingForPayment(State):
    name = "Waiting for payment"


class StateError(State,models.Model):
    name = "Error"

#
# class StatePaymentSuccess(State,models.Model):
#     pass
#
#
# class StateProcessing(State, models.Model):
#     pass
#

#
# class StateSent(State,models.Model):
#     pass
#
#
# class StateCancelled(State,models.Model):
#     pass
#
#
class Order(models.Model):
    #TODO: dorobić wzorzec stan
    status = models.ForeignKey(State)
    # owner = models.ForeignKey(Account)
    # shippingAddress = models.TextField()
    # postalCode = models.TextField()
    # city = models.TextField()
    # totalprice = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True)

    #TODO: dpisac metody do obslugi stanów
    def functionToManageState(self):
        pass

class ProductOrder(models.Model):
    order = models.ForeignKey(Order)
    product = models.ForeignKey(Product)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
