1) 'cd' into the project directory
2) 'virtualenv venv' in terminal to create virtual environment
3) 'source venv/bin/activate' to start virtual environment
4) 'pip install -r requirements.txt' to install nesseccary python packages

5) 'cd' into apps/bike_donations/static
6) 'bower install' to install css/js dependencies
7) if bower is not installed, run 'npm install -g bower' then repeat step 6

Deployment Instructions:

1) Make sure you are in the local master branch
2) $ pip install gunicorn 
3) $ pip install whitenoise
4) $ cd apps/bike_donations/static
5) $ bower install
6) Remove bower_components in .gitignore 
7) $ git add apps/bike_donations/static/bower_components 
8) $ git commit
9) $ python manage.py collectstatic
10) $ git add .
11) $ git commit
12) Install heroku toolbelt (https://toolbelt.heroku.com/)
13) $ heroku login 
	(enter login credentials)
14) $ heroku create
15) $ heroku config:set DISABLE_COLLECTSTATIC=1
16) $ git push heroku master
17) $ heroku apps:rename newname
    (If you want to change the app name)
	



