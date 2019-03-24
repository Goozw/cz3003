from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
import time

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend', backend='redis://localhost', broker='redis://')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


@app.task
def sample_print(content):
    while True:
        print(content)
        time.sleep(5)


@app.task
def facebook_manager():
    pass


@app.task
def twitter_manager():
    pass


@app.task
def sms_manager():
    pass


@app.task
def email_manager():
    pass