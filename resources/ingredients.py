from flask_restful import Resource, reqparse

from models.ingredients import IngredientsModel


class Ingredient(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=int,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('amount',
                        type=float,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('ingredient',
                        type=str,
                        required=False,
                        )
    parser.add_argument('measurement',
                        type=str,
                        required=False,
                        )

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()

        ingredient = IngredientsModel(data['id'],
                                      data['amount'],
                                      data['ingredient'],
                                      data['measurement'],
                                      )
        ingredient.save_to_db()

        return {"message": "Ingredient created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        ingredient = IngredientsModel.find_by_id(id)

        if ingredient:
            ingredient.id = data['id']
            ingredient.amount = data['amount']
            ingredient.ingredient = data['ingredient']
            ingredient.measurement = data['measurement']
        else:
            ingredient = IngredientsModel(**data)

        ingredient.save_to_db()

        return ingredient.json()

    @classmethod
    def get(cls, id: int):
        ingredient = IngredientsModel.find_by_id(id)
        if not ingredient:
            return {'message': 'Ingredient Not Found'}, 404
        return ingredient.json(), 200

    @classmethod
    def delete(cls, id: int):
        ingredient = IngredientsModel.find_by_id(id)
        if not ingredient:
            return {'message': 'Ingredient Not Found'}, 404
        ingredient.delete_from_db()
        return {'message': 'Ingredient deleted.'}, 200


class IngredientList(Resource):
    @classmethod
    def get(cls):
        return {'ingredients': [ingredient.json() for ingredient in IngredientsModel.find_all()]}
