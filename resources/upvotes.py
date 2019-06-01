from flask_restful import Resource, reqparse

from models.upvotes import UpVotesModel


class UpVote(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id',
                        type=int,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('recipes_id',
                        type=int,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('vote_score',
                        type=float,
                        required=True,
                        help="This field cannot be blank."
                        )

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()

        step = UpVotesModel(data['id'],
                            data['recipes_id'],
                            data['vote_score'],
                            )
        step.save_to_db()

        return {"message": "Upvote created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        upvote = UpVotesModel.find_by_id(id)

        if upvote:
            upvote.id = data['id']
            upvote.recipes_id = data['recipes_id']
            upvote.vote_score = data['vote_score']
        else:
            upvote = UpVotesModel(**data)

        upvote.save_to_db()

        return upvote.json()

    @classmethod
    def get(cls, id: int):
        upvote = UpVotesModel.find_by_id(id)
        if not upvote:
            return {'message': 'Upvote Not Found'}, 404
        return upvote.json(), 200

    @classmethod
    def delete(cls, id: int):
        upvote = UpVotesModel.find_by_id(id)
        if not upvote:
            return {'message': 'Upvote Not Found'}, 404
        upvote.delete_from_db()
        return {'message': 'Upvote deleted.'}, 200


class UpVotesList(Resource):
    @classmethod
    def get(cls):
        return {'upvotes': [upvotes.json() for upvotes in UpVotesModel.find_all()]}
