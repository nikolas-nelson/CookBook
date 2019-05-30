from flask_restful import Resource, reqparse

from models.recipes import RecipeModel
from models.categories import CategoriesModel


class Recipe(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('user_id',
                        type=int,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('cuisine_id',
                        type=int,
                        required=True,
                        help="Every recipes needs a cuisine_id."
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="Every recipes needs a name!"
                        )
    parser.add_argument('description',
                        type=str,
                        required=True,
                        help="Every recipes needs a description."
                        )
    parser.add_argument('image_path',
                        type=str,
                        required=False,
                        )
    parser.add_argument('total_time',
                        type=int,
                        required=False,
                        )
    parser.add_argument('prep_time',
                        type=int,
                        required=False,
                        )
    parser.add_argument('cook_time',
                        type=int,
                        required=False,
                        )
    parser.add_argument('level',
                        type=str,
                        required=False,
                        )
    parser.add_argument('source',
                        type=str,
                        required=False,
                        )
    parser.add_argument('rating',
                        type=float,
                        required=False,
                        )
    parser.add_argument('category',
                        type=dict,
                        required=False,
                        )

    @classmethod
    def get(cls, id):
        recipe = RecipeModel.find_by_id(id)
        if recipe:
            return recipe.json()
        return {'message': 'Recipe not found'}, 404

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()
        # print(data)
        recipe = RecipeModel(data['user_id'],
                             data['cuisine_id'],
                             data['name'],
                             data['description'],
                             data['image_path'],
                             data['total_time'],
                             data['prep_time'],
                             data['cook_time'],
                             data['level'],
                             data['source'],
                             data['rating'],
                             data['category']
                             )
        category = CategoriesModel(data['category']['id'],
                                   data['category']['name'],
                                   data['category']['description']
                                   )
        print(category.json())
        recipe.save_to_db(category)

        return {"message": "Recipe created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        recipe = RecipeModel.find_by_id(id)

        if recipe:
            recipe.user_id = data['user_id']
            recipe.cuisine_id = data['cuisine_id']
            recipe.name = data['name']
            recipe.description = data['description']
            recipe.image_path = data['image_path']
            recipe.total_time = data['total_time']
            recipe.prep_time = data['prep_time']
            recipe.cook_time = data['cook_time']
            recipe.level = data['level']
            recipe.source = data['source']
            recipe.rating = data['rating']
        else:
            recipe = RecipeModel(**data)

        recipe.save_to_db()

        return recipe.json()

    @classmethod
    def delete(cls, id):
        recipe = RecipeModel.find_by_id(id)
        if recipe:
            recipe.delete_from_db()

        return {'message': 'Recipe deleted'}


class RecipesList(Resource):
    @classmethod
    def get(cls):
        return {'recipes': [recipes.json() for recipes in RecipeModel.find_all()]}
