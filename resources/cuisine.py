from flask_restful import Resource, reqparse

from models.cuisine import CuisineModel


class Cuisine(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=int,
                        required=False,
                        help="This field cannot be blank."
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('description',
                        type=str,
                        required=False,
                        help="This field cannot be blank."
                        )

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()

        cuisine = CuisineModel(data['id'],
                               data['name'],
                               data['description'],
                               )
        cuisine.save_to_db()

        return {"message": "Cuisine created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        cuisine = CuisineModel.find_by_id(id)

        if cuisine:
            cuisine.name = data['name']
            cuisine.description = data['description']
        else:
            cuisine = CuisineModel(**data)

        cuisine.save_to_db()

        return cuisine.json()

    @classmethod
    def get(cls, id: int):
        cuisine = CuisineModel.find_by_id(id)
        if not cuisine:
            return {'message': 'Step Not Found'}, 404
        return cuisine.json(), 200

    @classmethod
    def delete(cls, id: int):
        cuisine = CuisineModel.find_by_id(id)
        if not cuisine:
            return {'message': 'Cuisine Not Found'}, 404
        cuisine.delete_from_db()
        return {'message': 'Cuisine deleted.'}, 200


class CuisineList(Resource):
    @classmethod
    def get(cls):
        return {'cuisine': [cuisine.json() for cuisine in CuisineModel.find_all()]}
