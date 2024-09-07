from django.contrib import admin
from .models import recipes, favorites

# Register your models here.


@admin.register(recipes)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ("name", "mealType")



@admin.register(favorites)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ("name", "mealType")