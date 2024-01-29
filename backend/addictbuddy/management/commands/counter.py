from django.core.management.base import BaseCommand
from users.models import User
from datetime import date

class Command(BaseCommand):
    
    help = 'Updates streaks of user based on their activities'

    def handle(self, *args, **options):
        
        for user in User.objects.all():

            if user.didChatWithBotToday:
                user.streak+=1 
                user.didChatWithBotToday=False #setting the field to False for the new day. This will be set to true after the user chats with bot
            else:
                user.streak=0 #reset the streak if user misses a day

            user.save()
        


        self.stdout.write(self.style.SUCCESS('Successfully updated daily streaks.'))