from flask_restful import Resource, reqparse

import json
import ast

from models.recipes import RecipeModel
from models.categories import CategoriesModel
from models.allergens import AllergensModel
from models.steps import StepsModel
from models.ingredients import IngredientsModel


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
    # parser.add_argument('rating',
    #                     type=float,
    #                     required=False,
    #                     )
    parser.add_argument('category',
                        action='append'
                        )
    parser.add_argument('allergens',
                        action='append'
                        )
    parser.add_argument('courses',
                        action='append'
                        )
    parser.add_argument('steps',
                        action='append'
                        )
    parser.add_argument('ingredients',
                        action='append'
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
        print(data)
        recipe = RecipeModel(data['user_id'],
                             data['cuisine_id'],
                             data['name'],
                             data['description'],
                             data['image_path'],
                             data['total_time'],
                             data['prep_time'],
                             data['cook_time'],
                             data['level'],
                             data['source']
                             )
        categories = data['category']
        for cat in categories:
            category_json = ast.literal_eval(cat)
            category = CategoriesModel(category_json['id'],
                                       category_json['name'],
                                       category_json['description']
                                       )
            recipe.save_recipe_to_db(category)

        allergens = data['allergens']
        for aller in allergens:
            allergens_json = ast.literal_eval(aller)
            allergen = AllergensModel(allergens_json['id'],
                                      allergens_json['name'],
                                      )
            recipe.save_allergen_to_db(allergen)

        courses = data['courses']
        for cour in courses:
            courses_json = ast.literal_eval(cour)
            course = AllergensModel(courses_json['id'],
                                    courses_json['name'],
                                    )
            recipe.save_course_to_db(course)

        steps = data['steps']
        for step in steps:
            steps_json = ast.literal_eval(step)
            step = StepsModel(steps_json['step_number'],
                              steps_json['instructions'],
                              )
            recipe.save_step_to_db(step)

        ingredients = data['ingredients']
        for ingredient in ingredients:
            ingredients_json = ast.literal_eval(ingredient)
            ingredient = IngredientsModel(ingredients_json['amount'],
                                          ingredients_json['ingredient'],
                                          ingredients_json['measurement']
                                          )
            recipe.save_ingredient_to_db(ingredient)

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
        else:
            recipe = RecipeModel(**data)

        categories = data['category']
        for cat in categories:
            category_json = ast.literal_eval(cat)
            category = CategoriesModel(category_json['id'],
                                       category_json['name'],
                                       category_json['description']
                                       )
            recipe.save_recipe_to_db(category)

        allergens = data['allergens']

        for aller in allergens:
            allergens_json = ast.literal_eval(aller)
            allergen = AllergensModel(allergens_json['id'],
                                      allergens_json['name'],
                                      )
            recipe.save_allergen_to_db(allergen)

        courses = data['courses']
        for cour in courses:
            courses_json = ast.literal_eval(cour)
            course = AllergensModel(courses_json['id'],
                                    courses_json['name'],
                                    )
            recipe.save_course_to_db(course)

        steps = data['steps']
        for step in steps:
            steps_json = ast.literal_eval(step)
            step = StepsModel(steps_json['id'],
                              steps_json['step_number'],
                              steps_json['instructions'],
                              )
            recipe.save_step_to_db(step)

        ingredients = data['ingredients']
        for ingredient in ingredients:
            ingredients_json = ast.literal_eval(ingredient)
            ingredient = IngredientsModel(ingredients_json['id'],
                                          ingredients_json['amount'],
                                          ingredients_json['ingredient'],
                                          ingredients_json['measurement']
                                          )
            recipe.save_ingredient_to_db(ingredient)

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
