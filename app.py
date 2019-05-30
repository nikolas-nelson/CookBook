from flask import Flask, jsonify
from flask_restful import Api

from resources.recipes import RecipesList, Recipe
from resources.user import User
from resources.steps import Step
from resources.comments import Comment
from resources.categories import Category, CategoriesList

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
api.add_resource(Comment, '/comment/<int:id>', '/comment')
api.add_resource(Category, '/category/<int:id>', '/category')
api.add_resource(CategoriesList, '/categories')

db.init_app(app)
if __name__ == '__main__':
    app.run()
