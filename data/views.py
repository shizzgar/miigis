from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator
from django.contrib.gis.db.models import Extent, GeometryField,PointField
from django.contrib.gis.geos import Point,MultiPoint,GeometryCollection

import os

from .additionals import Parser, Uploader
from .models import FileInfo, Node
from .forms import UploadForm



BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def testPars(request):
    
    dirName = os.path.join(BASE_DIR, 'info/')
    newDirName = os.path.join(BASE_DIR, 'info/old/')
    # filesList = os.listdir(dirName)
    filesList = (file for file in os.listdir(dirName) 
        if os.path.isfile(os.path.join(dirName, file)))

    for file in filesList:
        with open(os.path.join(dirName, file)) as text:

            date = file.rstrip('.txt').split('-')
            date = date[1] + '-' + date[2] + '-' + date[3] + ' ' + date[4] + ':' + date[5] 
            File = FileInfo.objects.create(name=file, date=date)

            for line in text:

                parser = Parser()
                tag, data = parser.parse(line) #returns DateTimeTag and dict of values 
                print(data)
                if data:
                    row = Node.objects.create(dateTimeLabel=tag, fileInfo=File, **data)
            
            os.rename(dirName+file, newDirName+file)

    return HttpResponse('Done')


def uploadFile(request):

    if request.method == 'POST':

        form = UploadForm(request.POST, request.FILES)

        if form.is_valid():

            if  FileInfo.objects.filter(name=request.FILES['file'].name).exists():
                return HttpResponse('File already in DB')

            else:
                uploader = Uploader()
                path = os.path.join(BASE_DIR, 'info/') + request.FILES['file'].name
                uploader.upload(request.FILES['file'], path)
                return HttpResponse('Good')

    else:

        form = UploadForm()

    return render(request, 'upload.html', {'form': form})



def listFiles(request):
    filesList = FileInfo.objects.all()
    paginator = Paginator(filesList, 5) 
    print(filesList)
    page = request.GET.get('page')
    files = paginator.get_page(page)
    return render(request, 'list.html', {'files': files})


def testMap(request):
    return render(request, 'map.html')


def infoOnMap(request, id):

    square = Node.objects.filter(fileInfo_id=id).aggregate(Extent('GPS', geo_field_type=GeometryField))
    ext=square['GPS__extent']
    mp=MultiPoint(Point(ext[1::-1]),Point(ext[3:1:-1]))
    nodes = Node.objects.filter(fileInfo_id=id)

    points = []
    props=[]
    for node in nodes:
        points.append(Point(node.GPS.y,node.GPS.x))
        d={}
        d['CO']=node.CO
        d['NO2']=node.NO2
        d['TEMP']=node.TEMP
        props.append(d)

    mps=MultiPoint(points)    

    return render(request, 'map.html', {
        'extent': mp.json,
        'points': mps.json,
        'props': props,
    })


