from django.urls import path
from . import views

urlpatterns = [
    path('parse/', views.testPars),
    path('upload/', views.uploadFile),
    path('list/', views.listFiles),
    path('map/<id>', views.infoOnMap),
]