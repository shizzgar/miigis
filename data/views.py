from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.paginator import Paginator
from django.contrib.gis.db.models import Extent, GeometryField,PointField
from django.contrib.gis.geos import Point,MultiPoint,GeometryCollection
from django.contrib.gis.measure import D
from django.contrib.auth.decorators import user_passes_test



import os
from geopy.distance import distance

from .additionals import Parser, Uploader
from .models import FileInfo, Node
from .forms import UploadForm



BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))




@user_passes_test(lambda u: u.is_superuser)
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

            cnt=0
            dist=0 
            d=0
            for line in text:

                parser = Parser()
                tag, data = parser.parse(line) #returns DateTimeTag and dict of values
                if data:
                    cnt+=1
                    if cnt == 1:
                        d = distance(data['GPS'], data['GPS'])
                        dist = d.m
                        data['dist'] = dist
                        prevp = data['GPS']
                        # print(dist)
                    else:
                        d = distance(prevp, data['GPS'])
                        dist+= abs(d.m)
                        data['dist'] = dist
                        prevp = data['GPS']
                        print(d.m)
                        print(dist)

                if data:
                    row = Node.objects.create(dateTimeLabel=tag, fileInfo=File, **data)
            
            os.rename(dirName+file, newDirName+file)

    return HttpResponse('Done')





def uploadFile(request):

    # if request.method == 'POST':

    #     form = UploadForm(request.POST, request.FILES)

    #     if form.is_valid():

    #         if  FileInfo.objects.filter(name=request.FILES['file'].name).exists():
    #             return HttpResponse('File already in DB')

    #         else:
    #             uploader = Uploader()
    #             path = os.path.join(BASE_DIR, 'info/') + request.FILES['file'].name
    #             uploader.upload(request.FILES['file'], path)
    #             return HttpResponse('Good')

    # else:

    #     form = UploadForm()

    # return render(request, 'upload.html', {'form': form})
    return redirect('/admin/data/filemod/add/')



def listFiles(request):
    filesList = FileInfo.objects.all()
    paginator = Paginator(filesList, 5) 
    print(filesList)
    page = request.GET.get('page')
    files = paginator.get_page(page)
    return render(request, 'list.html', {'files': files})


def hello(request):
    return render(request, 'start.html')


def infoOnMap(request, id):

    square = Node.objects.filter(fileInfo_id=id).aggregate(Extent('GPS', geo_field_type=GeometryField))
    ext=square['GPS__extent']
    mp=MultiPoint(Point(ext[1::-1]),Point(ext[3:1:-1]))
    nodes = Node.objects.filter(fileInfo_id=id).order_by('dateTimeLabel')

    points = []
    props=[]
    chartData=[]


    
    
    for node in nodes:
        points.append(Point(node.GPS.y,node.GPS.x))
        print()
        d={}
        cd={}
        
        d['CO']=node.CO
        d['NO2']=node.NO2
        d['TEMP']=node.TEMP
        props.append(d)

        cd['dateTimeLabel']=node.dateTimeLabel.strftime('%Y-%m-%dT%H:%M:%S.%f')
        cd['dist']=node.dist
        cd['TEMP']=node.TEMP
        cd['CO']=node.CO
        cd['NO2']=node.NO2
        chartData.append(cd)

    mps=MultiPoint(points) 
    # print(mps.json)   

    return render(request, 'map.html', {
        'extent': mp.json,
        'points': mps.json,
        'props': props,
        'chartData': chartData,
    })


