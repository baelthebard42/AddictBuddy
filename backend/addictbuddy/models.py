from django.db import models
from users.models import User

# Create your models here.

class Accomplishments(models.Model):

    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="u")
    day=models.IntegerField(default=0)
    askedAMotivationalQuote=models.BooleanField(default=False)
    askedAboutDailyGoals=models.BooleanField(default=False)
    askedAboutSkillorBook=models.BooleanField(default=False)
    askedAboutFeelAtthisPoint=models.BooleanField(default=False)
    content=models.TextField()
    previousExchange=models.TextField(default='')

    def __str__(self):
        return f"{self.user} : Day {self.user.streak}"
