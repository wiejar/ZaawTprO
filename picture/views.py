# -*- coding: utf-8 -*-
from picture.models import Picture

__author__ = 'slawek'

from rest_framework import viewsets, permissions

from picture.serializers import PictureSerializers


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializers

    def get_permissions(self):
        return (permissions.AllowAny(),)
