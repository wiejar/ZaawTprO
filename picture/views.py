# -*- coding: utf-8 -*-
from picture.models import Picture

__author__ = 'slawek'

from rest_framework import viewsets

from picture.serializers import PictureSerializers


class PictureViewSet(viewsets.ModelViewSet):
    """
    View - get serialized picture data to client-side application.
    """
    queryset = Picture.objects.all()
    serializer_class = PictureSerializers
