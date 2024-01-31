# Addiction as a global problem

American Society of Addiction Medicine (ASAM) defines addiction as : " a primary, chronic disease of brain reward, motivation, memory, and related circuitry. Dysfunction in these circuits leads to characteristic biological, psychological, social, and spiritual manifestations"
. Notice how addiction not just is basic dependency on substances but can basically be on anything; games, food, work, gambling. While there can be addictions that bring positive changes in you, for instance
being addicted to getting good grades improves you for certain but there are obvious downsides to it as well.

As of 2024, around 70% of teens and young adults admit to having a social media addiction. More than half of them say its almost impossible for them to get rid of social media. Another data shows 31.9% of people aged 16-24
admit they use cigarettes regularly, even knowing the consequences. These are common forms of addictions damaging the upcoming generation who supposedly will run their offices, states and countries in the upcoming decades.

In context of Nepal, our very own parents seem to be glued to their screens for entirety of the day, passing the same culture to the kids. Most are not ready to hear it but our society is basically headed towards an addiction dystopia,
with people of almost every age addicted to either substances, screens or games.


# AddictBuddy

AddictBuddy is an AI powered web platform designed to get track your two major types of addictions: Substance addiction and Social media addiction. The following are the major features:

1. **Meet Buddy, your AI friend** : Buddy is an AI chatbot specially designed to help people recovering or wanting to recover from certain types of addictions. Talk to him about your issues, coping mechanisms,
   relationships and everything else you cannot discuss even with people close to you. He gives you answers with proper psychological interpretations and readymade suggestions to cope with addictions.

2. **Buddy generates journal for you** : Based on what you talk with Buddy, he generates a series of paragraphs, what we call "accomplishments for each day". You can view each day's journal in the accomplishment section each day !. Keep talking
   with him view those accomplishments to track your progress. For example :

   User : "I learnt about various areas of music today"

   This will be added in that day's accomplishment as "You learnt about various areas of music today. I am really hoping it helps you in your journey."

    You and only you will have access to your accomplishments.

3. **Buddy has a relapse mode** : It is common for recovering addicts to fall back to their usual ways at minor inconveniences. So, Buddy has a relapse mode to be used if the users get a sign that they are having a relapse. This mode forces user to think for themselves with triggering responses.



4. **Streak maintainence** : To make sure the users visit Buddy daily, there is a streak feature. The higher the streak, more progress and accomplishments and more Buddy knows you. Missing a streak results in it's
   reset and deletion of all the accomplishments thus far.

Recovering from addiction requires commitment and that is exactly what we're trying to teach here.


# Running the application

## Prerequisites

Make sure you have Node installed in your system. You can get it from node.js. Also, make sure you have Python installed. 

## Setup


 Clone out repository.
`git clone https://github.com/baelthebard42/AddictBuddy.git`

Go to the repository and install the required files using commands:


```
cd frontend
npm install
cd ..
cd backend
pip install -r requirements.txt
```

## Starting the app
Run backend server by the command:

```
py manage.py runserver
```

Start the application by:

```
cd ..
cd frontend
npm run dev
```

To update all the user streaks manually, use command:

`py manage.py counter`

To automate the process, just run the runMe.py file. Make sure it runs the whole time.

# Dependencies

1. OpenAI API
2. Other dependencies listed in requirements.txt and package.json


