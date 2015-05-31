# -*- coding: utf-8 -*-

__author__ = 'slawek'

from django.db import models


class Picture(models.Model):
    url = models.CharField(max_length=200, blank=True)
    desc = models.CharField(max_length=50, blank=True)