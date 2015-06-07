# -*- coding: utf-8 -*-

__author__ = 'slawek'

from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

# Create your views here.

class photo_set_root(ModelViewSet):
    queryset = render.__str__()