from email.policy import default
from django.db import models
from django.forms import BooleanField
import string
import random


def generate_unique_code():
    length = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    
    return code


# Create your models here.

class Room(models.Model):
    code = models.CharField(max_length=10, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=40, unique=True)
    guest_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_time = models.DateTimeField(auto_now_add=True)
