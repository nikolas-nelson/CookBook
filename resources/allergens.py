from flask_restful import Resource, reqparse

from models.allergens import AllergensModel


class Allergen(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=int,
                        required=False,
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()
        print(data)
        allergens = AllergensModel(data['id'],
                                   data['name'])
        allergens.save_to_db()

        return {"message": "Allergen created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        allergen = AllergensModel.find_by_id(id)

        if allergen:
            allergen.name = data['name']
        else:
            allergen = AllergensModel(**data)

        allergen.save_to_db()

        return allergen.json()

    @classmethod
    def get(cls, id: int):
        allergen = AllergensModel.find_by_id(id)
        if not allergen:
            return {'message': 'Allergen Not Found'}, 404
        return allergen.json(), 200

    @classmethod
    def delete(cls, id: int):
        allergen = AllergensModel.find_by_id(id)
        if not allergen:
            return {'message': 'Allergen Not Found'}, 404
        allergen.delete_from_db()
        return {'message': 'Allergen deleted.'}, 200


class AllergensList(Resource):
    @classmethod
    def get(cls):
        return {'allergens': [allergen.json() for allergen in AllergensModel.find_all()]}
