from db import db


class CuisineModel(db.Model):
    __tablename__ = 'cuisine'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    recipes = db.relationship('RecipeModel', lazy='dynamic')

    def __init__(self, id, name, description):
        self.id = id
        self.name = name
        self.description = description

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
        }

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
