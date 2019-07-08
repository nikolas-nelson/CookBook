from db import db


class UserModel(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    password = db.Column(db.String(80))

    recipes = db.relationship('RecipeModel', lazy='dynamic')

    def __init__(self, name, password):
        self.name = name
        self.password = password

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    @classmethod
    def find_by_username(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
