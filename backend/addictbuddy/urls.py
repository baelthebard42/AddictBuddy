from django.urls import path
from . import views

urlpatterns = [
    path('botReply', views.BuddyAddict.as_view()),
    path('relapseBotReply', views.RelapseBuddyAddict.as_view()),
    path('getAcc', views.getAllAccomplishments.as_view()), #to get all accomplishments of a user
    path('getOne/<int:pk>', views.getOneAccomplishment.as_view() ) #to get one accomplishment
]