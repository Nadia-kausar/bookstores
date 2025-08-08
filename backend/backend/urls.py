from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static  # ✅ Needed for serving images

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('bookstore.urls')),  # ✅ Your API endpoints
]

# ✅ Serve uploaded images during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
