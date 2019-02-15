set this conf to 1

heroku config:set BUILD_WITH_GEO_LIBRARIES=1





add this lines to the end of settings.py

import dj_database_url
DATABASES['default'] = dj_database_url.config()
DATABASES['default']['ENGINE'] = 
'django.contrib.gis.db.backends.postgis'

GDAL_LIBRARY_PATH = os.getenv('GDAL_LIBRARY_PATH')
GEOS_LIBRARY_PATH = os.getenv('GEOS_LIBRARY_PATH')
