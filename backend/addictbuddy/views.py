from .utils import chatbot, RelapseChatBot
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import AccSerializer
from .models import Accomplishments
from users.models import User
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView

# Create your views here.

class OkBuddyAddict(APIView):
    permission_classes = [IsAuthenticated]

    def get_bot_reply(self, user_id, user_input):
        raise NotImplementedError("Subclasses must implement get_bot_reply")

    def post(self, request):
        user_input = request.data.get('userInput')
        user_id = request.user.id
        bot_reply = self.get_bot_reply(user_id, user_input)
        return JsonResponse({"reply": bot_reply}, status=200, safe=False)

class BuddyAddict(OkBuddyAddict):
    def get_bot_reply(self, user_id, user_input):
        print(user_id, user_input)
        return chatbot(userID=user_id, userInput=user_input)

class RelapseBuddyAddict(OkBuddyAddict):
    def get_bot_reply(self, user_id, user_input):
        return RelapseChatBot(userID=user_id, userInput=user_input)

'''def test(request):
    resp=RelapseChatBot(userID=3, userInput='Me watching my dream going away from me')
    return JsonResponse({"reply": resp}, status=200, safe=False)
'''

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


