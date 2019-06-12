from db import db
import simplejson as json


class IngredientsModel(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    recipes_id = db.Column(db.Integer, db.ForeignKey('recipes.id', ondelete='CASCADE'))
    amount = db.Column(db.DECIMAL(3, 2))
    ingredient = db.Column(db.String)
    measurement = db.Column(db.String)
    recipes = db.relationship('RecipeModel', single_parent=True)

    def __init__(self, id, amount, ingredient, measurement):
        self.id = id
        self.amount = amount
        self.ingredient = ingredient
        self.measurement = measurement

    def json(self):
        return {
            'id': self.id,
            'amount': json.dumps(self.amount),
            'ingredient': self.ingredient,
            'measurement': self.measurement,
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
