# -*- coding: utf-8 -*-

__author__ = 'slawek'

from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account


class AccountSerializer(serializers.ModelSerializer):
    """
    Serializer to serialize accounts to authentication relation
    serialize fields: id, email, username, created_at, update_at, first_name, last_name, password,
                      confirm_password, phone_number, company_name, tax_identification_number
    """
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    ## This method updates user's data.
    # @param self The object pointer
    # @type: Object
    # @param instance User's instance
    # @type: Object
    def update_hash(self, instance):
        update_session_auth_hash(self.context.get('request'), instance)

    class Meta:
        """
        Defines metadata the serializer requires to operate.
        """
        model = Account
        fields = (
        'id', 'email', 'username', 'created_at', 'update_at', 'first_name', 'last_name', 'password',
        'confirm_password', 'phone_number', 'company_name', 'tax_identification_number',)
        read_only_fields = ('created_at', 'update_at',)

        ## This method creates new user.
        # @param self The object pointer
        # @type: Object
        # @param validated_data Validated data about user
        # @type: Object
        # @return Data about user
        # @rtype: Object
        def create(self, validated_data):
            return Account.objects.create(**validated_data)
