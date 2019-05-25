from flask_restful import Resource, reqparse

from models.steps import StepsModel


class Step(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('step_number',
                        type=int,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('instructions',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('recipes_id',
                        type=int,
                        required=True,
                        help="This field cannot be blank."
                        )

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()

        step = StepsModel(data['step_number'],
                          data['instructions'],
                          data['recipes_id'],
                          )
        step.save_to_db()

        return {"message": "Step created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        step = StepsModel.find_by_id(id)

        if step:
            step.step_number = data['step_number']
            step.instructions = data['instructions']
            step.recipes_id = data['recipes_id']
        else:
            step = StepsModel(**data)

        step.save_to_db()

        return step.json()

    @classmethod
    def get(cls, id: int):
        step = StepsModel.find_by_id(id)
        if not step:
            return {'message': 'Step Not Found'}, 404
        return step.json(), 200

    @classmethod
    def delete(cls, id: int):
        step = StepsModel.find_by_id(id)
        if not step:
            return {'message': 'Step Not Found'}, 404
        step.delete_from_db()
        return {'message': 'Step deleted.'}, 200
