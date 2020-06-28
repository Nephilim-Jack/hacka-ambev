import json
from django.views.decorators.csrf import csrf_exempt
from django.http import (
    HttpResponse, JsonResponse,
    HttpResponseNotAllowed
)
from .models import (
    Place, Drink,
    User, Group
)

# Create your views here.


@csrf_exempt
def createUser(request):
    if request.method == 'POST':
        receivedData = json.loads(request.body.decode('utf-8'))

        user = User(
            name=receivedData['name'],
            username=receivedData['username'],
            userUf=receivedData['uf'],
            userCity=receivedData['city'],
            password=receivedData['password']
        )

        user.save()
        return HttpResponse('Success', status=201,)
    else:
        return HttpResponseNotAllowed(['POST'])
