from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'quantity', 'employee', 'id']

class ProductListSerializer(serializers.ModelSerializer):
    adminName =  serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['name', 'description', 'quantity', 'employee', 'id', 'adminName']

    def get_adminName(self, obj):
        return obj.employee.username if obj.employee else None