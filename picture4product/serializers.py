# -*- coding: utf-8 -*-

__author__ = 'slawek'

from rest_framework import serializers
from picture4product.models import Picture4Product
from picture.serializers import PictureSerializers


class Picture4ProductSerializers(serializers.ModelSerializer):
    picture = PictureSerializers(read_only=True, required=False)

    class Meta:
        model = Picture4Product

        fields = ('picture',)