from flask_restful import Resource, reqparse

from models.courses import CoursesModel


class Course(Resource):
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
        course = CoursesModel(data['id'],
                              data['name'])
        course.save_to_db()

        return {"message": "Course created successfully."}, 201

    @classmethod
    def put(cls, id):
        data = cls.parser.parse_args()
        course = CoursesModel.find_by_id(id)

        if course:
            course.name = data['name']
        else:
            course = CoursesModel(**data)

        course.save_to_db()

        return course.json()

    @classmethod
    def get(cls, id: int):
        course = CoursesModel.find_by_id(id)
        if not course:
            return {'message': 'Course Not Found'}, 404
        return course.json(), 200

    @classmethod
    def delete(cls, id: int):
        course = CoursesModel.find_by_id(id)
        if not course:
            return {'message': 'Course Not Found'}, 404
        course.delete_from_db()
        return {'message': 'Course deleted.'}, 200


class CoursesList(Resource):
    @classmethod
    def get(cls):
        return {'courses': [course.json() for course in CoursesModel.find_all()]}
