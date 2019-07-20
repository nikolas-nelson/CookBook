# CookBook [Demo URL](https://cookbook.nickwebdev.com) 

This project/website is a web application that allows users to store and easily access cooking recipes.

Find top-rated or new recipes, comment and rate them! Do you have your favourite recipes? Share them with others! Register, Login
and add your favourite recipes. Any time you can edit or delete your recipe. Watch comments and how others rate your recipes!

_This project was created as simple as possible on the course recommendation and to show underspending of learned knowledge in the course module._


##UX

Design for this project is simple and clear to do not distract users from the main purpose of the website. The main goal
 is that any user can quickly find recipe what they looking for or add or edit their recipes. 

Design/mockup was created in Adobe XD the exported pdf you can find in the design folder in the project.


## Features

#### Registration and Login
You can register and login to be able to add your recipe or comment recipes others. Also, you can see all your recipes.

####  Adding, deleting and editing recipes, courses, allergens and categories.
You can easily add, edit or delete your recipe and if you need to add, edit or remove allergens, courses or categories you also can. 

#### Adding recipe image 
Do you have a photo of your recipe? Here you can share it with your recipe. 

#### Search by name + filters + sorting 
Search in your recipe database by name or use filters to reduce the number of results and then sort them alphabetically.

#### Comment and rate
Add your comment to recipes you have tried or rate them if you like them.

### Features Left to Implement

#### Video recipes
Some people prefer video recipes so, it will be a good feature to implement. 

#### Nutrition
It will be good if we have nutrition information about a recipe we going to cook. 
 
## Technologies Used

### Front end

#### Angular
I'm using this to build all the front end logic and components for my app. As Typescript makes it easy to compile and also easy to scaffold code.

#### NG-Bootstrap
NG Bootstrap was created to give components and directives to Angular without the use of jQuery. I'm using the modal, and tooltip directives to display information for the user in a simple but good way.

#### Ngx-pagination
A simple solution to create pagination without a lot of code using directives in Angular. 

#### ngx-toastr

An amazing npm module to create minimal toast notification services. Using this to display errors and information on the first screen when fetching the API.

#### ngx-cookie-service
Easy solution for adding and reading browser cookies.

### Back End

#### Python 
The whole backend is written in Python as Flask is written in Python.

#### Flask
The API backend is written with the Flask Microframwork this is used to loop over the database, create an array and append the results into it for Angular to consume.

#### MySQL
I used MySQL database for this project because Flask has nice SQLAlchemy extension to managed queries with MySQL DB.

#### Server 
The live demo running on my Linode server (Ubuntu 16.04) and with Nginx. SSL created by Certbot.

## Testing

#### Automatic Testing:

Many test was done by Angular CLI, TSLint and Karma us a part of Angular app.

You can run some by Angular CLI

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng lint` to execute the unit tests via [TSLint](https://palantir.github.io/tslint/).

#### Manual Tests

I'm fairly certain that I have done a lot of tests. So for manual tests, we have tested the following

Responsive Testing

##### Browsers

```
Chrome 
FireFox
Safari
Brave
```

##### API 
REST API was manually tested by Postman link for all endpoints [here](https://www.getpostman.com/collections/c663c284ede627ffac83)

#### AB testing
I done AB tests such as:

* Submit an empty recipe form.
* Submit a recipe form without fill in required fields.
* Add a comment without name or comment
* Summit a registration with different confirm password
* Register user with an existing user name 

and many more ...

#### Requirements

```
NodeJS 8+ 
NPM 5.6+ 
Python 3+ 
Angular 4+ 
```

#### Installing

1. Clone the project
```
git clone https://github.com/Jeybee89/CookBook.git
```

2. Change Directory into the root folder

```
cd CookBook
```

3. Create a Virtual Environment
```
virtualenv .venv
```
4. Install Python dependencies

```
pip install -r requirements.txt
```

5. Install Angular dependencies by running

```
npm install
```
6. Start the server

```
python app.py 
```

7. Start the client

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment

Project was deployed on my Linode server running on Ubuntu 16 using Nginx and Cerbot for SSL. To run Flack I’m using nohup and is is connected to MySQL DB running on the same server.

For running the app on https you need SSL certificate and add fullchain.pem and privkey.pem in app.py. To run it locally 
delete SSL and run on http only. 

Create dbconfig.py file with your connection to MySQL DB and your secret key for JWT Token.

```
dbConfig = 'mysql+pymysql://username:password@yourServerIP:3306/yourDB'

secretKey = 'yourSicretKey'
``` 

## Credits

[Flask documentation](https://flask.palletsprojects.com/en/1.1.x/)

[SQLalchemy doc](https://www.sqlalchemy.org/)

[Angular doc](https://angular.io/docs)

[Stackoverflow](https://stackoverflow.com)

[images, recipes and inspiration](www.eat-vegan.rock)
