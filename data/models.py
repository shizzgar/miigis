from django.contrib.gis.db import models
from django.core.files.storage import FileSystemStorage
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

fs = FileSystemStorage(location=BASE_DIR+'/info')

class FileMod(models.Model):
    File = models.FileField(storage=fs)


class FileInfo(models.Model):
    name = models.CharField(max_length=30, unique=True)
    date = models.DateTimeField()
    
    class Meta:
        ordering = ['id']

class Node(models.Model):
    dateTimeLabel = models.DateTimeField()
    g1 = models.IntegerField()
    L = models.IntegerField()
    T = models.CharField(max_length=200)
    BAT = models.IntegerField()
    ACC = models.CharField(max_length=200)
    G4 = models.CharField(max_length=200)
    # GPS = models.GeometryField(geography=True)
    GPS = models.GeometryField()
    dist = models.FloatField(null=True)
    TEMP = models.FloatField()
    CO = models.FloatField()
    NO2 = models.FloatField()
    fileInfo = models.ForeignKey(FileInfo, on_delete=models.CASCADE)
    