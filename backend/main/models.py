from django.db import models

# Create your models here.


class recipes(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.JSONField()
    instructions = models.JSONField()
    image = models.TextField()
    mealType = models.JSONField()
    rating = models.FloatField()
    reviewCount = models.IntegerField()
    prepTimeMinutes = models.IntegerField()
    cookTimeMinutes = models.IntegerField()
    caloriesPerServing = models.IntegerField()


    def __str__(self):
        return self.name
    

class favorites(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.JSONField()
    instructions = models.JSONField()
    image = models.TextField()
    mealType = models.JSONField()
    rating = models.FloatField()
    reviewCount = models.IntegerField()
    prepTimeMinutes = models.IntegerField()
    cookTimeMinutes = models.IntegerField()
    caloriesPerServing = models.IntegerField()


    def __str__(self):
        return self.name