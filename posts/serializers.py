# -*- coding: utf-8 -*-

__author__ = 'slawek'


from rest_framework import serializers
from posts.models import Post
from authentication.serializers import AccountSerializer


class PostSerializers(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Post

        fields = ('id','author','content','created_at','updated_at')
        read_only_fields = ('id','created_at','updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusion = super(PostSerializers, self).getvalidation_exclusions()

        return exclusion + ['author']