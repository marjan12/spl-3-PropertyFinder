from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Profile, Contact
from django.contrib.auth import get_user_model

User = get_user_model()

admin.site.unregister(Group)
admin.site.site_header = 'Property Finder Admin'
admin.site.site_title = 'Property Finder Admin'
admin.site.index_title = 'Property Finder Admin'


# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'seller', 'agency_name', 'phone_number')

    fields = ('seller', 'agency_name', 'phone_number', 'bio', 'profile_picture')

    search_fields = ('agency_name', 'phone_number')


admin.site.register(Profile, ProfileAdmin)


class ContactAdmin(admin.ModelAdmin):
    list_display = ('subject', 'email', 'name')

    fields = ('name', 'email', 'subject', 'message')

    search_fields = ('email', 'subject')


admin.site.register(Contact, ContactAdmin)


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_active', 'date_joined')

    fields = ('first_name', 'last_name', 'username', 'email', 'is_active', 'is_superuser', 'date_joined')

    list_filter = ('is_active',)

    search_fields = ('username', 'email', 'username')


admin.site.register(User, UserAdmin)
