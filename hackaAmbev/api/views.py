import json
from django.core import serializers
from django.views import View
from django.http import (
    HttpResponse, JsonResponse,
)
from django.utils.crypto import get_random_string
from .models import (
    Place, Drink,
    User, Group,
    Transaction
)

# Create your views here.


class PlaceView(View):
    def get(self, request):
        try:
            receivedData = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            receivedData = None

        if receivedData:
            # Filter Settings
            pass
        else:
            placesList = serializers.serialize('json', Place.objects.all())

        returnList = list()
        for place in json.loads(placesList):
            tempDict = {'pk': place['pk']}

            for fieldKey, fieldValue in place['fields'].items():
                tempDict[fieldKey] = fieldValue

            # Setting drinks in place
            placeDrinks = json.loads(serializers.serialize(
                'json',
                Drink.objects.filter(foundPlace__pk=place['pk'])
            ))
            tempDict['drinks'] = list()
            for drink in placeDrinks:
                drinkDict = {'pk': drink['pk']}
                for drinkKey, drinkValue in drink['fields'].items():
                    if drinkKey != 'foundPlace':
                        drinkDict[drinkKey] = drinkValue

                tempDict['drinks'].append(drinkDict)

            returnList.append(tempDict)

        return JsonResponse(returnList, safe=False)

    def post(self, request):
        receivedData = json.loads(request.body.decode('utf-8'))

        place = Place(
            name=receivedData['name'],
            lat=receivedData['lat'],
            lng=receivedData['lng'],
            placeUf=receivedData['uf'],
            placeCity=receivedData['city'],
            contact=receivedData['contact'],
            description=receivedData['desc'],
            hasMusic=receivedData['music'],
            hasKidSpace=receivedData['kidSpace'],
            hasWifi=receivedData['wifi'],
            hasAccessibility=receivedData['access']
        )

        place.save()
        return HttpResponse(status=201)


class UserView(View):
    def post(self, request):
        receivedData = json.loads(request.body.decode('utf-8'))

        user = User(
            name=receivedData['name'],
            username=receivedData['username'],
            userUf=receivedData['uf'],
            userCity=receivedData['city'],
            password=receivedData['password']
        )

        user.save()
        return HttpResponse(status=201)


class DrinksView(View):
    def get(self, request, placePk=None):
        if placePk:
            placeDrinks = json.loads(serializers.serialize(
                'json',
                Drink.objects.filter(foundPlace__pk=placePk)
            ))
            drinkList = list()
            for drink in placeDrinks:
                drinkDict = {'pk': drink['pk']}
                for drinkKey, drinkValue in drink['fields'].items():
                    if drinkKey != 'foundPlace':
                        drinkDict[drinkKey] = drinkValue

                drinkList.append(drinkDict)
            return JsonResponse(drinkList, safe=False)

        # If theres is no placePk, reduce quantity of one drink
        try:
            receivedData = json.loads(request.body.decode('utf-8'))
        except Exception:
            receivedData = None

        token = get_random_string(128)
        for drink in receivedData['drinks']:
            drinkPk = drink['drinkPk']
            quantity = drink['quantity']

            place = Drink.objects.get(pk=drinkPk).foundPlace
            trans = Transaction(
                user=User.objects.get(pk=receivedData['userPk']),
                place=place,
                drink=Drink.objects.get(pk=drinkPk),
                quantity=quantity,
                token=token
            )
            trans.save()

            drink = Drink.objects.get(pk=drinkPk)
            drink.digitalQuantity -= quantity
            drink.save()

        return HttpResponse(token)


class TransactionView(View):
    def get(self, request):
        try:
            receivedData = json.loads(request.body.decode('utf-8'))
        except Exception:
            receivedData = None

        token = receivedData['token']
        for trans in Transaction.objects.filter(token__exact=token):
            trans.finished = True
            trans.save()

            drink = Drink.objects.get(pk=trans.drink.pk)
            drink.realQuantity -= trans.quantity
            drink.save()

        return HttpResponse()


class GroupView(View):
    def post(self, request):
        try:
            receivedData = json.loads(request.body.decode('utf-8'))
        except Exception:
            receivedData = None

        if receivedData['mode'] == 'create':
            # Create group
            group = Group.objects.create(
                name=receivedData['name'],
            )
            group.users.set(User.objects.filter(pk__in=receivedData['users']))
            return HttpResponse(status=201)
        else:
            group = Group.objects.get(pk=receivedData["groupPk"])

            for userPk in receivedData['users']:
                group.users.add(User.objects.get(pk=userPk))

            group.save()
            return HttpResponse(status=201)

    def delete(self, request):
        try:
            receivedData = json.loads(request.body.decode('utf-8'))
        except Exception:
            receivedData = None

        group = Group.objects.get(pk=receivedData['groupPk'])
        for user in User.objects.filter(pk__in=receivedData['users']):
            group.users.remove(user.pk)

        group.save()
        return HttpResponse()
