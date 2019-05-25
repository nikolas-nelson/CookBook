from flask_restful import Resource, reqparse

from models.user import UserModel

_user_parser = reqparse.RequestParser()
_user_parser.add_argument('name',
                          type=str,
                          required=True,
                          help="This field cannot be blank."
                          )
_user_parser.add_argument('password',
                          type=str,
                          required=True,
                          help="This field cannot be blank."
                          )


class User(Resource):

    @classmethod
    def get(cls, id: int):
        user = UserModel.find_by_id(id)
        if not user:
            return {'message': 'User Not Found'}, 404
        return user.json(), 200

    @classmethod
    def delete(cls, id: int):
        user = UserModel.find_by_id(id)
        if not user:
            return {'message': 'User Not Found'}, 404
        user.delete_from_db()
        return {'message': 'User deleted.'}, 200
