from db import db


class StepsModel(db.Model):
    __tablename__ = 'steps'

    id = db.Column(db.Integer, primary_key=True)
    step_number = db.Column(db.Integer)
    instructions = db.Column(db.Text)
    recipes_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    def __init__(self, step_number, instructions, recipes_id):
        self.step_number = step_number
        self.instructions = instructions
        self.recipes_id = recipes_id

    def json(self):
        return {
            'id': self.id,
            'step_number': self.step_number,
            'instructions': self.instructions,
            'recipes_id': self.recipes_id,
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
