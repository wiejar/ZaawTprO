# -*- coding: utf-8 -*-
__author__ = 'Jarek'

from django.db import models
from authentication.models import Account
from product.models import Product


class Order(models.Model):
    """
    DataBase model of whole order.
    """
    state = models.CharField(max_length=50)
    owner = models.ForeignKey(Account)
    shippingAddress = models.TextField()
    postalCode = models.TextField()
    city = models.TextField()
    totalprice = models.DecimalField(max_digits=10, decimal_places=2)
    additional_information = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True)

class ProductOrder(models.Model):
    """
    DataBase model of products related to order.
    """
    order = models.ForeignKey(Order, related_name='productOrder')
    product = models.ForeignKey(Product)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()

