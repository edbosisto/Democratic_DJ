from email.policy import default
from django.db import models
from django.forms import BooleanField

# Create your models here.

class Room(models.Model):
    code = models.CharField(max_length=10, default="", unique=True)
    host = models.CharField(max_length=40, unique=True)
    guest_pause = BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_time = models.DateTimeField(auto_now_add=True)
