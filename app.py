from flask import Flask, jsonify
from flask_restful import Api

from resources.recipes import RecipesList, Recipe
from resources.user import User


from db import db

app = Flask(__name__)

from dbconfig import dbConfig
app.config['SQLALCHEMY_DATABASE_URI'] = dbConfig
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
api = Api(app)

api.add_resource(RecipesList, '/recipes')
api.add_resource(Recipe, '/recipe/<int:id>')
api.add_resource(User, '/user/<int:user_id>')
db.init_app(app)
if __name__ == '__main__':
    app.run()
