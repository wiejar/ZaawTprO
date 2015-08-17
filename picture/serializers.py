# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import serializers
from picture.models import Picture


class PictureSerializers(serializers.ModelSerializer):
    """
    Serializer to serialize pictures from database.
    """
    class Meta:
        """
        Contain definition of PictureSerializers
        """

        model = Picture
        fields = ('id', 'url', 'desc')