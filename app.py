from flask import Flask, jsonify
from flask_restful import Api

from resources.recipes import RecipesList, Recipe
from resources.user import User
from resources.steps import Step

from dbconfig import dbConfig

from db import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = dbConfig
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
api = Api(app)

api.add_resource(RecipesList, '/recipes')
api.add_resource(Recipe, '/recipe/<int:id>', '/recipe')
api.add_resource(User, '/user/<int:id>')
api.add_resource(Step, '/step/<int:id>', '/step')
db.init_app(app)
if __name__ == '__main__':
    app.run()
