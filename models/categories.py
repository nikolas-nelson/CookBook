from db import db

from models.recipes import RecipeCategory


class CategoriesModel(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.Text)

    recipes = db.relationship('RecipeModel', secondary='recipes_has_categories')

    def __init__(self, id, name, description):
        self.id = id
        self.name = name
        self.description = description

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'recipes': [recipes.json() for recipes in self.recipes],
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
