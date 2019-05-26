from db import db


class CommentsModel(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text)
    name = db.Column(db.String)
    email = db.Column(db.String)
    recipes_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    def __init__(self, comment, name, email, recipes_id):
        self.comment = comment
        self.name = name
        self.email = email
        self.recipes_id = recipes_id

    def json(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'name': self.name,
            'email': self.email,
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
