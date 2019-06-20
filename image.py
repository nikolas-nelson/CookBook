from flask_restful import Resource, reqparse
from flask import request
import os

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class Image(Resource):
    @classmethod
    def post(cls):
        target = os.path.join(APP_ROOT, 'client/src/assets/img/')
        if not os.path.isdir(target):
            os.mkdir(target)

        if request.files:
            file = request.files['image']
            filename = file.filename
            if filename == '':
                return 'no file name'
            if file and allowed_file(filename):
                destination = "/".join([target, filename])
                file.save(destination)
        else:
            return 'no image'
