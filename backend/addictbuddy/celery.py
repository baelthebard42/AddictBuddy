import os
from celery import Celery
from celery.schedules import crontab
# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Set the log level for the worker
os.environ['CELERYD_LOG_LEVEL'] = 'info'

# Set the log level for Celery Beat
os.environ['CELERYBEAT_LOG_LEVEL'] = 'info'

app = Celery('addict')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.beat_scheduler = 'django_celery_beat.schedulers:DatabaseScheduler'
# Load task modules from all registered Django apps.
app.autodiscover_tasks()
app.conf.broker_connection_retry_on_startup = True

"""app.conf.beat_schedule={
    
    'counter': {
        'task': 'addictbuddy.tasks.daily_streaks_update',
        'schedule': crontab(hour=12, minute=12),  # Run daily at midnight
    },
}"""


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')