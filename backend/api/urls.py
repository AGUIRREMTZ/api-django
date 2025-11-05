"""
URL patterns for the API endpoints
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='api-overview'),
    path('dataset-info/', views.dataset_info, name='dataset-info'),
    path('columns/', views.get_columns, name='columns'),
    path('columns/<str:category>/', views.get_columns, name='columns-by-category'),
    path('statistics/', views.get_statistics, name='statistics'),
    path('attack-types/', views.get_attack_types, name='attack-types'),
    path('sample-data/', views.get_sample_data, name='sample-data'),
]
