from .utils import chatbot
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import AccSerializer
from .models import Accomplishments
from users.models import User
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView

# Create your views here.

class buddyAddict(APIView):

    permission_classes=[IsAuthenticated]

    def post(self, request):

        userInput=request.data['userInput']
        userID=request.user.id
        botReply=chatbot(userID=userID, userInput=userInput)
        return JsonResponse({"reply": botReply}, status=200, safe=False)
    
def test(request):
    resp=chatbot(userID=3, userInput='I am learning things')
    return JsonResponse({"reply": resp}, status=200, safe=False)



class getAllAccomplishments(APIView):

    permission_classes=[IsAuthenticated]

    def get(self, request):
        print(self.kwargs)
        user=User.objects.get(id=request.user.id)
        ins=Accomplishments.objects.filter(user=user)
        serializer=AccSerializer(ins, many=True)
        return Response(serializer.data)
    
class getOneAccomplishment(RetrieveAPIView):
    queryset=Accomplishments.objects.all()
    serializer_class=AccSerializer
    permission_classes=[IsAuthenticated]
