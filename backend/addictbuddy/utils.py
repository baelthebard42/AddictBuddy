from openai import OpenAI
import random
from .models import Accomplishments
from users.models import User

API_KEY="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"

client=OpenAI(api_key=API_KEY)



def chatbot(userID, userInput=''):
    
    userObject=User.objects.get(id=userID)

    contextInitial = f"You are a chatbot talking to a person trying to overcome his {userObject.type} addiction. Call them buddy or use their name, interchangably. Try helping them with proper answers to their questions. Use as much warmth as possible. If gone out of topic, answer them but add a warning that they are going out of topic. Their name is {userObject.user_name}. Use their name at times but don't over do it. If their response is negative like, no or I don't want to, just say, fine. If they say they are about to relapse, tell them to switch to relapse mode. Keep your responses to about 2-3 sentences"
    additionalContext=''
    previousExchange=''
    
    


    if userObject.didChatWithBotToday and userInput=='':
       
       accInstance=Accomplishments.objects.get(user=userObject, day=userObject.streak )
       accInstance.previousExchange=''
       accInstance.save()
       
       
       additionalContext='The user chatted with you previously today. He is back now. Say him you are glad to have him back or welcome in any way you can. Use his name'
    

    if not userObject.didChatWithBotToday:

        
        try:
         accInstance=Accomplishments(user=userObject, day=userObject.streak)
         accInstance.save()
        except Exception as e:
           print(f"Error creating accomplishment instance: {e}")

        userObject.didChatWithBotToday=True
        userObject.save()

        additionalContext=f"The user is on his day {userObject.streak} streak of talking with you daily. Welcome them by using their name, it's your first chat with him today. Congratulate him on the streak. Don't ask how to help them. Just say shall we begin. The user should get a feeling that you are going to take care of everything. "

    
    accInstance=Accomplishments.objects.get(user=userObject, day=userObject.streak )

    if accInstance.previousExchange!='':

     previousExchange= 'This was our previous exchange if needed: \n' + accInstance.previousExchange

    if userInput!='':
   
     additionalContext+='No need to welcome them in any way this time, just get to the point directly.'

     

     fields_to_ask_about = [
            ("askedAboutDailyGoals", " Ask the user this question if they would like to share about their to-do tasks today or anything they accomplished?"),
            ("askedAboutFeelAtthisPoint", "Ask the user how they feel right now, describe their feelings towards addiction and what led them to quit it."),
            ("askedAMotivationalQuote", "Tell the user a motivational quote, not regarding addiction but about winning things."),
            ("askedAboutSkillorBook", "Ask the user if they are reading any book or learning anything new.")
        ]

     fields_to_ask_about = [(field, question) for field, question in fields_to_ask_about if not getattr(accInstance, field)]

     if len(fields_to_ask_about)!=0:
            random_field, question = random.choice(fields_to_ask_about)
            setattr(accInstance, random_field, True)
            additionalContext += f"\n\n{question}"

            accInstance.save()
   
    


    
    completion = client.chat.completions.create(
                     model="gpt-3.5-turbo",
                     messages=[{"role": "system", "content": contextInitial+additionalContext},
                    {"role": "user", "content": userInput+previousExchange}
                           ]
                              )
    
    if accInstance:
       
       newAccomplishment=AccomplishmentGenerator(userInput, prevParts=accInstance.content)

       if newAccomplishment not in accInstance.content:
        accInstance.content+=(newAccomplishment+'\n')

       accInstance.previousExchange = f'user: {userInput}\n\nchatbot: {completion.choices[0].message.content}'
       accInstance.save()
    
    return completion.choices[0].message.content


def AccomplishmentGenerator(content):

   completion = client.chat.completions.create(
                     model="gpt-3.5-turbo",
                     messages=[{"role": "system", "content":f"You are given a bunch of text from the user. Translate it in 2nd person with same exact words, don't change the words please. Add some insights as well, frame it as his accomplishments. Also, ignore the questions, unless it means something related to their addiction. Do not add anything on your own, just translate the content. Generate just one or two sentences. Keep it related to the content. eg: I played guitar becomes You played guitar today. Music really connects you with yourself. "} ,
                    {"role": "assistant", "content": content}
                           ]
                              )
   return completion.choices[0].message.content



    


        

        






