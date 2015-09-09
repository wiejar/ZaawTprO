# -*- coding: utf-8 -*-
__author__ = 'slawek'

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class AccountManager(BaseUserManager):
    """
    DataBase model: specification of newly created user.
    """

    ## This method creates new user.
    # @param self The object pointer
    # @type: Object
    # @param email New user's email
    # @type: String
    # @param password New user's password
    # @type: String
    # @return object account
    # @rtype: Object
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have a valid email address.')

        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        account = self.model(
            email=self.normalize_email(email),
            username=kwargs.get('username'),
            phone_number=kwargs.get('phone_number'),
            company_name = kwargs.get('company_name'),
            tax_identification_number=kwargs.get('tax_identification_number')
        )

        account.set_password(password)
        account.save()

        return account

    ## This method creates new superuser.
    # @param self The object pointer
    # @type: Object
    # @param email New superuser's email
    # @type: String
    # @param password New superuser's password
    # @type: String
    # @return object account
    # @rtype: Object
    def create_superuser(self, email, password=None, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.save()

        return account


class Account(AbstractBaseUser):
    """
    DataBase model: data about registrating user.
    """
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    phone_number = models.CharField(max_length=9, blank=True)
    is_admin = models.BooleanField(default=False)
    company_name = models.CharField(max_length=40, null=True, blank=True)
    tax_identification_number = models.CharField(max_length=10, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    ## This method shows the user's email.
    # @param self The object pointer
    # @type: Object
    # @return String email
    # @rtype: String
    def __unicode__(self):
        return self.email

    ## This method shows the user's full name.
    # @param self The object pointer
    # @type: Object
    # @return String user's full name
    # @rtype: String
    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    ## This method shows the user's first name.
    # @param self The object pointer
    # @type: Object
    # @return String user's first name
    # @rtype: String
    def get_short_name(self):
        return self.first_name
