from django.urls import path
from . import views

urlpatterns = [
    path('', views.hello),
    path('parse/', views.testPars),
    path('upload/', views.uploadFile),
    path('list/', views.listFiles),
    path('map/<id>', views.infoOnMap),
]