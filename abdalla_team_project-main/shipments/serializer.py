from rest_framework import serializers
from .models import Shipments


class ShipmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipments
        fields = ['id', 'employee',
                  'approved', 'shipped', 'product_id', 'quentity']


class ShipmentsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipments
        fields = ['id', 'approved', 'shipped', 'admin_approved']


class ShipmentsViewSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()

    class Meta:
        model = Shipments
        fields = ['id', 'employee',
                  'approved', 'shipped', 'product_name', 'quentity' ]

    def get_product_name(self, obj):
        return obj.product_id.name 
    

    # def get_adminName(self, obj):
    #     return obj.employee.username if obj.employee else None