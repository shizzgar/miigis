from django.contrib import admin
from django import forms
from .models import FileInfo, Node, FileMod
from .forms import UploadForm



admin.site.register(FileInfo)
admin.site.register(Node)
admin.site.register(FileMod)

# Register your models here.
