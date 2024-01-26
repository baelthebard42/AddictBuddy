from rest_framework import generics, status
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class UserCreate(generics.ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer


class LogOut(APIView):

    def post(request):
     
     try:
        refresh=request.data['refresh_token']
        instance=RefreshToken(refresh)
        instance.blacklist()
        return Response("Logout sucessful !!", status=status.HTTP_200_OK)
     except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)
     
     
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sendAuthenticatedUser(request):
    authUser=UserSerializer(request.user)
    return Response(authUser.data, status=status.HTTP_200_OK )

