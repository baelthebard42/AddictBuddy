from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, Group, Permission

# Create your models here.

class CustomManager(BaseUserManager):

    def create_user(self, user_name, email, password, **other_fields):

        if not user_name:
            raise ValueError("Username is a required field !!")
        
        if not email:
            raise ValueError("Email is a required field !!")
        

        email=self.normalize_email(email)
        new = self.model(user_name=user_name, email=email, **other_fields)
        new.set_password(password)
        new.save()
        return new
    
    def create_superuser(self, user_name, email, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be a staff')
        
        if other_fields.get('is_superuser') is not True:
            raise ValueError('SUperuser must be superuser')
        
        return self.create_user(user_name=user_name, email=email, password=password, **other_fields )
    


class User(AbstractBaseUser, PermissionsMixin):

    types=(('social', 'Social Media'), ('substance', 'Substance Addiction'))

    user_name=models.CharField(max_length=10, unique=True)
    email=models.EmailField(max_length=30, unique=True)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    type=models.CharField(max_length=10, choices=types)
    groups = models.ManyToManyField(Group, related_name='user_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='user_permissions')
    objects=CustomManager()

    
    REQUIRED_FIELDS=['email'] 
    USERNAME_FIELD='user_name' #for logins

    def __str__(self):
        return self.user_name
