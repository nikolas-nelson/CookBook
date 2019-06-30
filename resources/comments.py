from flask_restful import Resource, reqparse

from models.comments import CommentsModel


class Comment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('comment',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('email',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('recipes_id',
                        type=int,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('user_id',
                        type=int,
                        required=True,
                        help="This field cannot be blank."
                        )

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()

        step = CommentsModel(data['comment'],
                             data['name'],
                             data['email'],
                             data['recipes_id'],
                             data['user_id'],
                             )
        step.save_to_db()

        return {"message": "Comment created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        comment = CommentsModel.find_by_id(id)

        if comment:
            comment.comment = data['comment']
            comment.name = data['name']
            comment.email = data['email']
            comment.recipes_id = data['recipes_id']
            comment.user_id = data['user_id']
        else:
            comment = CommentsModel(**data)

        comment.save_to_db()

        return comment.json()

    @classmethod
    def get(cls, id: int):
        comment = CommentsModel.find_by_id(id)
        if not comment:
            return {'message': 'Comment Not Found'}, 404
        return comment.json(), 200

    @classmethod
    def delete(cls, id: int):
        comment = CommentsModel.find_by_id(id)
        if not comment:
            return {'message': 'Comment Not Found'}, 404
        comment.delete_from_db()
        return {'message': 'Comment deleted.'}, 200
