## Django webpack project
### Includes
* django-annoying
* django-webpack-loader

### How to use
Create virtual environment, change project_name with your projects name :D
```sh
mkvirtualenv project_name
```

Install django
```sh
pip install django
```

Run django startproject with the --template option
```sh
django-admin.py startproject --template=https://github.com/netoxico/django-bootstrap/archive/master.zip project_name
```

Install requirements, for development
```sh
pip install -r requirements/development.txt
```

Set 'PROJECT_ENV' environment variable.
* 'development'
* 'production',
* 'staging'

If no 'PROJECT_ENV' especified takes 'development' settings as default

For development environment:
```sh
sudo sh -c 'echo "export PROJECT_ENV=development" >> /etc/profile.d/environment.sh' && source /etc/profile.d/environment.sh
```

### Webpack
During development webpack will bundle js and css (after sass compilation)
Run the following to watch for changes (in MacOS):
node_modules/.bin/webpack --config webpack.config.js --watch
