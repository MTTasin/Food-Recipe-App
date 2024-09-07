from django.shortcuts import render
from .serializers import recipesSerializer
from .models import recipes, favorites
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


class recipesViewSet(viewsets.ModelViewSet):
    serializer_class = recipesSerializer
    queryset = recipes.objects.all()

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return super().create(request, *args, **kwargs)
        
    
    


class favoritesViewSet(viewsets.ModelViewSet):
    serializer_class = recipesSerializer
    queryset = favorites.objects.all()
    