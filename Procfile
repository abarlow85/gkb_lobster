web: python manage.py runserver
web: gunicorn gkb_lobster.wsgi --log-file -
heroku ps:scale web=1