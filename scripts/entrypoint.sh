#!/bin/sh

set -e

 # Wait for the database to be ready
python manage.py wait_for_db

# Make migrations for all apps
python manage.py makemigrations

# Apply migrations for all apps
python manage.py migrate

python manage.py runserver 0.0.0.0:8000