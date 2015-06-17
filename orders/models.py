# -*- coding: utf-8 -*-
__author__ = 'Jarek'

from django.db import models
from authentication.models import Account
from product.models import Product
from abc import ABCMeta


class StateModel(models.Model):
    pass#name = models.CharField(max_length=50)


class State(metaclass=ABCMeta):
    pass

class StateAccepted(State):
    pass

class StateWaitingForPayment(State):
    pass


class StateError(State):
    pass


class StatePaymentSuccess(State):
    pass


class StateProcessing(State):
    pass


class StateSent(State):
    pass


class StateCancelled(State):
    pass


class Order(models.Model):
    #TODO: zmienić na wzorzec STAN
    state = models.CharField(max_length=50)
    owner = models.ForeignKey(Account)
    shippingAddress = models.TextField()
    postalCode = models.TextField()
    city = models.TextField()
    totalprice = models.DecimalField(max_digits=10, decimal_places=2)
    additional_information = models.TextField()
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
