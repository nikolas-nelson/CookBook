from db import db
import simplejson as json



class UpVotesModel(db.Model):
    __tablename__ = 'upvotes'

    id = db.Column(db.Integer, primary_key=True)
    recipes_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    vote_score = db.Column(db.DECIMAL(3, 2))

    def __init__(self, id, recipes_id, vote_score):
        self.id = id
        self.recipes_id = recipes_id
        self.vote_score = vote_score

    def json(self):
        return {
            'id': self.id,
            'recipes_id': self.recipes_id,
            'vote_score': json.dumps(self.vote_score),
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
