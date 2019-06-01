from flask import Flask, jsonify
from flask_restful import Api

from resources.recipes import RecipesList, Recipe
from resources.user import User
from resources.steps import Step
from resources.comments import Comment
from resources.categories import Category, CategoriesList
from resources.allergens import Allergen, AllergensList
from resources.courses import Course, CoursesList
from resources.cuisine import Cuisine, CuisineList
from resources.upvotes import UpVote, UpVotesList

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
api.add_resource(Allergen, '/allergen/<int:id>', '/allergen')
api.add_resource(AllergensList, '/allergens')
api.add_resource(Course, '/course/<int:id>', '/course')
api.add_resource(CoursesList, '/courses')
api.add_resource(Cuisine, '/cuisine/<int:id>', '/cuisine')
api.add_resource(CuisineList, '/cuisines')
api.add_resource(UpVote, '/upvote/<int:id>', '/upvote')
api.add_resource(UpVotesList, '/upvotes')

db.init_app(app)
if __name__ == '__main__':
    app.run()
