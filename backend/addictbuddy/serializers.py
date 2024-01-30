from rest_framework.serializers import ModelSerializer
from .models import Accomplishments


class AccSerializer(ModelSerializer):
    class Meta:
        model=Accomplishments
        fields=['id', 'user', 'day', 'content']
        