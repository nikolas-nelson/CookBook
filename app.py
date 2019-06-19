from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from blacklist import BLACKLIST

from resources.recipes import RecipesList, Recipe
from resources.user import UserRegister, UserLogin, User, TokenRefresh, UserLogout
from resources.steps import Step
from resources.comments import Comment
from resources.categories import Category, CategoriesList
from resources.allergens import Allergen, AllergensList
from resources.courses import Course, CoursesList
from resources.cuisine import Cuisine, CuisineList
from resources.upvotes import UpVote, UpVotesList
from resources.ingredients import Ingredient, IngredientList
from image import Image

from dbconfig import dbConfig

from db import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = dbConfig
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
api = Api(app)

"""
JWT related configuration. The following functions includes:
1) add claims to each jwt
2) customize the token expired error message 
"""
app.config['JWT_SECRET_KEY'] = 'nick'
app.config['JWT_BLACKLIST_ENABLED'] = True  # enable blacklist feature
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']  # allow blacklisting for access and refresh tokens
jwt = JWTManager(app)

"""
`claims` are data we choose to attach to each jwt payload
and for each jwt protected endpoint, we can retrieve these claims via `get_jwt_claims()`
"""


@jwt.user_claims_loader
def add_claims_to_jwt(identity):
    if identity == 1:  # instead of hard-coding, we should read from a config file to get a list of admins instead
        return {'is_admin': True}
    return {'is_admin': False}


# This method will check if a token is blacklisted, and will be called automatically when blacklist is enabled
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    return decrypted_token['jti'] in BLACKLIST


# The following callbacks are used for customizing jwt response/error messages.
@jwt.expired_token_loader
def expired_token_callback():
    return jsonify({
        'message': 'The token has expired.',
        'error': 'token_expired'
    }), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):  # we have to keep the argument here, since it's passed in by the caller internally
    return jsonify({
        'message': 'Signature verification failed.',
        'error': 'invalid_token'
    }), 401


@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        "description": "Request does not contain an access token.",
        'error': 'authorization_required'
    }), 401


@jwt.needs_fresh_token_loader
def token_not_fresh_callback():
    return jsonify({
        "description": "The token is not fresh.",
        'error': 'fresh_token_required'
    }), 401


@jwt.revoked_token_loader
def revoked_token_callback():
    return jsonify({
        "description": "The token has been revoked.",
        'error': 'token_revoked'
    }), 401


# JWT configuration ends
cors = CORS(app, resources={r"/*": {"origins": "*"}})   # allowing Cross-Origin Resource Sharing

# endpoints
api.add_resource(RecipesList, '/recipes')
api.add_resource(Recipe, '/recipe/<int:id>', '/recipe')
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
api.add_resource(Ingredient, '/ingredient/<int:id>', '/ingredient')
api.add_resource(IngredientList, '/ingredients')
api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(User, '/user/<int:user_id>')
api.add_resource(TokenRefresh, '/refresh')
api.add_resource(UserLogout, '/logout')
api.add_resource(Image, '/img_upload')

db.init_app(app)
if __name__ == '__main__':
    app.run()
