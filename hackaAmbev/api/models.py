from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.


class Place(models.Model):
    name = models.CharField(max_length=256)

    lat = models.FloatField()
    lng = models.FloatField()

    placeUf = models.CharField(max_length=256)
    placeCity = models.CharField(max_length=256)

    contact = models.CharField(max_length=256)
    description = models.CharField(max_length=512)

    hasMusic = models.BooleanField(default=False)
    hasKidSpace = models.BooleanField(default=False)
    hasWifi = models.BooleanField(default=False)
    hasAccessibility = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Drink(models.Model):
    drinkName = models.CharField(max_length=256)

    realQuantity = models.IntegerField(default=0)
    digitalQuantity = models.IntegerField(default=0)
    foundPlace = models.ForeignKey('api.Place', on_delete=models.DO_NOTHING)

    imageUrl = models.CharField(max_length=1024)

    def __str__(self):
        string = f'{self.digitalQuantity}/{self.realQuantity}'
        return f'{self.drinkName}({string}) - {self.foundPlace.name}'


class User(models.Model):
    name = models.CharField(max_length=256)
    username = models.CharField(max_length=256)

    userUf = models.CharField(max_length=256)
    userCity = models.CharField(max_length=256)

    password = models.CharField(max_length=1024)

    # TODO Balance, AmbevPoints

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


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    place = models.ForeignKey(Place, on_delete=models.DO_NOTHING)
    drink = models.ForeignKey(Drink, on_delete=models.DO_NOTHING)

    quantity = models.IntegerField(default=0)
    token = models.CharField(default='AUTO', max_length=128)
    finished = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} - {self.place.name} > {self.drink.drinkName}'
