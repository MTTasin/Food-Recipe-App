from django.shortcuts import render
from .serializers import recipesSerializer, favoritesSerializer
from .models import recipes, favorites
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

# Create your views here.


class recipesViewSet(viewsets.ModelViewSet):
    serializer_class = recipesSerializer
    queryset = recipes.objects.all()
    pagination_class = PageNumberPagination

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return super().create(request, *args, **kwargs)
        
    # Dynamically set limit how many recipes to fetch
    def get_queryset(self):
        limit = self.request.query_params.get('limit')
        name = self.request.query_params.get('name')
        if limit:
            return self.queryset.all()[:int(limit)]
        elif name:
            return self.queryset.filter(name__icontains=name)
        else:
            return self.queryset.all()
    

    
    


class favoritesViewSet(viewsets.ModelViewSet):
    serializer_class = favoritesSerializer
    queryset = favorites.objects.all()
    