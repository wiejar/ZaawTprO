# -*- coding: utf-8 -*-

__author__ = 'slawek'

import json

from django.contrib.auth import authenticate, login, logout

from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response

from authentication.models import Account
from authentication.serializers import AccountSerializer
from authentication.permissions import IsAccountOwner


class AccountViewSet(viewsets.ModelViewSet):
    """
    View - get full data about account.
    Account is selecting on the base 'username' field.
    """
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    ## This method gives permission to create new user.
    # @param self The object pointer
    # @type: Object
    # @return Permission for user to create new account
    # @rtype: Object
    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    ## This method gives permission to update user's data.
    # @param self The object pointer
    # @type: Object
    # @param serializer to serialize update
    # @type: Object
    def perform_update(self, serializer):
        if serializer.is_valid():
            instance = serializer.instance
            instance.save(update_fields=['email'])

            validated_data = serializer.validated_data
            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if password and confirm_password and password == confirm_password:
                instance.set_password(password)
                instance.save(update_fields=['password'])

            serializer.update_hash(instance)

    ## This method creates server's response.
    # @param self The object pointer
    # @type: Object
    # @param request for the response
    # @type: Object
    # @return Response server's response
    # @rtype: Response
    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
                            'status': 'Bad request',
                            'message': 'Account could not be created with received data.'
                        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    """
    View to log in for user - data necessary for user to log in.
    """

    ## This is POST method.
    # @param self The object pointer
    # @type: Object
    # @param request for the response
    # @type: Object
    # @return Response server's response
    # @rtype: Response
    def post(self, request, format=None):
        datas = request.body
        data = json.loads(datas.decode("utf-8"))
        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)
                serialized = AccountSerializer(account)
                return Response(serialized.data)
            else:
                return Response({
                                    'status': 'Unathorized',
                                    'message': 'This account has been disabled'
                                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                                'status': 'Unathorized',
                                'message': 'Username/password combination invalid'
                            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    """
    View to log out for user.
    """
    permission_classes = (permissions.IsAuthenticated,)

    ## This is POST method.
    # @param self The object pointer
    # @type: Object
    # @param request for the server's response
    # @type: Object
    # @return Response server's response
    # @rtype: Response
    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)