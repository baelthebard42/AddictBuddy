from django.urls import path
from . import views

urlpatterns = [
    path('botReply', views.buddyAddict.as_view())
]
