from db import db


class StepsModel(db.Model):
    __tablename__ = 'steps'

    id = db.Column(db.Integer, primary_key=True)
    step_number = db.Column(db.Integer)
    instructions = db.Column(db.Text)
    recipes_id = db.Column(db.Integer, db.ForeignKey('recipes.id', ondelete='CASCADE'))
    recipes = db.relationship('RecipeModel', single_parent=True)

    def __init__(self, id, step_number, instructions):
        self.id = id
        self.step_number = step_number
        self.instructions = instructions

    def json(self):
        return {
            'id': self.id,
            'step_number': self.step_number,
            'instructions': self.instructions,
        }

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
