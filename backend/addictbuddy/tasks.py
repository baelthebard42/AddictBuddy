from celery import shared_task
from django.core.management import call_command
import logging

logger = logging.getLogger(__name__)




@shared_task
async def daily_streaks_update():
     logger.info("Executing Task")
