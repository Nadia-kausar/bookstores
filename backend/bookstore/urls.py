from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('books/', views.get_books, name='get_books'),  # ✅ Fixed
    path('place-order/', views.place_order, name='place_order'),
    path('my-orders/', views.user_orders, name='user_orders'),
]
