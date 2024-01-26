from django.urls import path
from . import views

urlpatterns = [
    path('create', views.UserCreate.as_view()),
    path('logout', views.LogOut.as_view()),
    path('loggedUser', views.sendAuthenticatedUser)
]
