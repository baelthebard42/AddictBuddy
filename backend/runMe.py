#make sure you run this from top most backend directory. Keep this running for updating user streaks.

import pycron
import time
import os

while True:
    if pycron.is_now('0 0 * * *'):  # At midnight every day
        os.system('py manage.py counter')
    time.sleep(60)  