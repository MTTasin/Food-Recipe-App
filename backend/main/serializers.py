from rest_framework import serializers
from .models import recipes, favorites

class recipesSerializer(serializers.ModelSerializer):
    class Meta:
        model = recipes
        fields = '__all__'


class favoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = favorites
        fields = '__all__'