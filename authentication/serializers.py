# -*- coding: utf-8 -*-

__author__ = 'slawek'

from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    def update_hash(self, instance):
        update_session_auth_hash(self.context.get('request'), instance)

    class Meta:
        model = Account
        fields = (
        'id', 'email', 'username', 'created_at', 'update_at', 'first_name', 'last_name', 'password',
        'confirm_password', 'phone_number', 'company_name', 'tax_identification_number',)
        read_only_fields = ('created_at', 'update_at',)

        def create(self, validated_data):
            return Account.objects.create(**validated_data)
