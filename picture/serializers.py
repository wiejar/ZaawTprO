# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import serializers
from picture.models import Picture


class PictureSerializers(serializers.ModelSerializer):
    class Meta:
        model = Picture

        fields = ('id', 'url', 'desc')