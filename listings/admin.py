from django.contrib import admin
from listings.models import Listing
from listings.models import Poi
from .forms import PoisForm


# Register your models here.


class PoiAdmin(admin.ModelAdmin):
    form = PoisForm

    list_display = ('name', 'type')
    fields = ('name', 'type', 'latitude', 'longitude')
    list_filter = ('type',)

    search_fields = ('name',)


# admin.site.register(Listing)
admin.site.register(Poi, PoiAdmin)


class ListingAdmin(admin.ModelAdmin):
    list_display = ('title', 'listing_type', 'price', 'borough', 'seller',)

    # fields = '__all__'

    list_filter = ('property_status', 'listing_type', 'borough', 'seller', 'cctv', 'pool', 'furnished', 'parking')

    search_fields = ('title',)


admin.site.register(Listing, ListingAdmin)
