from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    password=serializers.CharField(write_only=True)

    class Meta:

        model=User
        fields=['id', 'user_name', 'email', 'type', 'password']

    def create(self, validated_data): #invoked when save serializer is called

        password=validated_data.pop('password', None)
        new=self.Meta.model(**validated_data)

        if password is not None:
            new.set_password(password) #hashing
        
        new.save()
        return new