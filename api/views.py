import json
from django.core import serializers
from django.views import View
from django.http import (
    HttpResponse, JsonResponse,
)
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password, check_password
from .models import (
    Place, Drink,
    User, Group,
    Transaction
)

# Create your views here.


class PlaceView(View):
    def get(self, request, placePk=None):
        if placePk is None:
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
        else:
            if placePk != None:
                place = Place.objects.get(pk=placePk)
                place = json.loads(serializers.serialize('json', [place, ]))
                # serialize
                place = place[0]
                placeDict = {'pk': place['pk']}
                for key, val in place.items():
                    if key == 'fields':
                        for fieldKey, fieldValue in val.items():
                            if fieldKey != 'password':
                                placeDict[fieldKey] = fieldValue
                
                placeDrinks = json.loads(serializers.serialize(
                    'json',
                    Drink.objects.filter(foundPlace__pk=placePk)
                ))
                placeDict['drinks'] = list()
                for drink in placeDrinks:
                    drinkDict = {'pk': drink['pk']}
                    for drinkKey, drinkValue in drink['fields'].items():
                        if drinkKey != 'foundPlace':
                            drinkDict[drinkKey] = drinkValue
                    
                    placeDict['drinks'].append(drinkDict)

                return JsonResponse(placeDict)

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
            password=make_password(receivedData['password']),
            userImage=receivedData['image']
        )

        user.save()
        return HttpResponse(status=201)

    def get(self, request):
        if request.headers['mode'] == 'login':
            username = request.headers['username']
            password = request.headers['password']
            for user in User.objects.filter(username__exact=username):
                if check_password(password, user.password):
                    user = json.loads(serializers.serialize('json', [user, ]))
                    # serialize
                    user = user[0]
                    userDict = {'pk': user['pk']}
                    for key, val in user.items():
                        if key == 'fields':
                            for fieldKey, fieldValue in val.items():
                                if fieldKey != 'password':
                                    userDict[fieldKey] = fieldValue

                    return JsonResponse(userDict)

            return HttpResponse(status=401)


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

        drinks = json.loads(request.headers['drinks'])
        userPk = int(request.headers['userPk'])
        token = get_random_string(128)
        for drink in drinks:
            drinkPk = drink['drinkPk']
            quantity = drink['quantity']

            place = Drink.objects.get(pk=drinkPk).foundPlace
            trans = Transaction(
                user=User.objects.get(pk=userPk),
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
        token = request.headers['token']

        ok = False
        for trans in Transaction.objects.filter(token__exact=token):
            if trans.finished == False:
                ok = True
                trans.finished = True
                trans.save()

                drink = Drink.objects.get(pk=trans.drink.pk)
                drink.realQuantity -= trans.quantity
                drink.save()
        
        if ok:
            return HttpResponse()
        else:
            return HttpResponse(status=401)


class GroupView(View):
    def get(self, request, groupPk):
        if groupPk != None:
            group = Group.objects.get(pk=groupPk)
            usersList = list()
            for user in group.users.all():
                usersList.append({
                    'pk': user.pk,
                    'username': user.username,
                    'imageUrl': user.userImage
                })

            return JsonResponse(usersList, safe=False)

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
        
        users = json.loads(request.headers['users'])
        group = Group.objects.get(pk=int(request.headers['groupPk']))
        for user in User.objects.filter(pk__in=users):
            group.users.remove(user.pk)

        group.save()
        return HttpResponse()
