from .utils import chatbot
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

# Create your views here.

class buddyAddict(APIView):

    permission_classes=[IsAuthenticated]

    def post(self, request):

        userInput=request.data['userInput']
        userID=request.user.id
        botReply=chatbot(userID=userID, userInput=userInput)
        return JsonResponse({"reply": botReply}, status=200, safe=False)