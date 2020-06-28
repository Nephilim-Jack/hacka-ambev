from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.


class Place(models.Model):
    placeName = models.CharField(max_length=256)

    lat = models.FloatField()
    lng = models.FloatField()

    placeUf = models.CharField(max_length=256)
    placeCity = models.CharField(max_length=256)

    availableDrinks = models.ManyToManyField('api.Drink')

    def __str__(self):
        return self.placeName


class Drink(models.Model):
    drinkName = models.CharField(max_length=256)

    quantity = models.IntegerField(default=0)
    foundPlace = models.ForeignKey('api.Place', on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.drinkName


class User(models.Model):
    name = models.CharField(max_length=256)
    username = models.CharField(max_length=256)

    userUf = models.CharField(max_length=256)
    userCity = models.CharField(max_length=256)

    password = models.CharField(max_length=1024)

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.username


class Group(models.Model):
    name = models.CharField(max_length=256)
    users = models.ManyToManyField('api.User')

    createdAt = models.DateField(auto_now=True)

    def __str__(self):
        return self.name
