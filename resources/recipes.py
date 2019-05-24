from flask_restful import Resource

from models.recipes import RecipeModel


class Recipe(Resource):
    @classmethod
    def get(cls, id):
        recipe = RecipeModel.find_by_id(id)
        if recipe:
            return recipe.json()
        return {'message': 'Recipe not found'}, 404

    @classmethod
    def post(cls, id):
        if RecipeModel.find_by_id(id):
            return {'message': "A recipe with id '{}' already exists.".format(id)}, 400

        recipe = RecipeModel(id)
        try:
            recipe.save_to_db()
        except:
            return {"message": "An error occurred creating the recipe."}, 500

        return recipe.json(), 201

    @classmethod
    def delete(cls, id):
        store = RecipeModel.find_by_id(id)
        if store:
            store.delete_from_db()

        return {'message': 'Recipe deleted'}


class RecipesList(Resource):
    @classmethod
    def get(cls):
        return {'recipes': [recipes.json() for recipes in RecipeModel.find_all()]}
