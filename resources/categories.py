from flask_restful import Resource, reqparse

from models.categories import CategoriesModel


class Category(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('description',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()

        step = CategoriesModel(
                               data['name'],
                               data['description']
                               )
        step.save_to_db()

        return {"message": "Category created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        category = CategoriesModel.find_by_id(id)

        if category:
            category.name = data['name']
            category.description = data['description']
        else:
            category = CategoriesModel(**data)

        category.save_to_db()

        return category.json()

    @classmethod
    def get(cls, id: int):
        category = CategoriesModel.find_by_id(id)
        if not category:
            return {'message': 'Category Not Found'}, 404
        return category.json(), 200

    @classmethod
    def delete(cls, id: int):
        category = CategoriesModel.find_by_id(id)
        if not category:
            return {'message': 'Category Not Found'}, 404
        category.delete_from_db()
        return {'message': 'Category deleted.'}, 200
