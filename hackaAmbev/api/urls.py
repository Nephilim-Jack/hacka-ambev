from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import (
    PlaceView, UserView,
    DrinksView, TransactionView,
    GroupView
)

urlpatterns = [
    path('place', csrf_exempt(PlaceView.as_view())),
    path('user', csrf_exempt(UserView.as_view())),
    path('drinks', csrf_exempt(DrinksView.as_view())),
    path('drinks/<int:placePk>', csrf_exempt(DrinksView.as_view())),
    path('trans', csrf_exempt(TransactionView.as_view())),
    path('group', csrf_exempt(GroupView.as_view()))
]
