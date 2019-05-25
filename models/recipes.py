from db import db
import simplejson as json


class RecipeModel(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True, )
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    cuisine_id = db.Column(db.Integer)
    name = db.Column(db.String(150))
    description = db.Column(db.Text)
    image_path = db.Column(db.String(100))
    total_time = db.Column(db.Integer)
    prep_time = db.Column(db.Integer)
    cook_time = db.Column(db.Integer)
    level = db.Column(db.String(45))
    source = db.Column(db.String(45))
    rating = db.Column(db.DECIMAL(3, 2))

    steps = db.relationship('StepsModel', backref='step',
                            cascade="all, delete-orphan",
                            lazy='dynamic',
                            passive_deletes=True)

    def __init__(self, user_id, cuisine_id, name, description, image_path, total_time, prep_time, cook_time, level,
                 source, rating):
        self.user_id = user_id
        self.cuisine_id = cuisine_id
        self.name = name
        self.description = description
        self.image_path = image_path
        self.total_time = total_time
        self.prep_time = prep_time
        self.cook_time = cook_time
        self.level = level
        self.source = source
        self.rating = json.dumps(rating)

    def json(self):
        return {
            'name': self.name,
            'user_id': self.user_id,
            'cuisine_id': self.cuisine_id,
            'description': self.description,
            'image_path': self.image_path,
            'total_time': self.total_time,
            'prep_time': self.prep_time,
            'cook_time': self.cook_time,
            'level': self.level,
            'source': self.source,
            'rating': json.dumps(self.rating),
            'steps': [steps.json() for steps in self.steps.all()]
        }

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    # @classmethod
    # def find_by_filter(cls, param):
    #     return cls.query(RecipeModel).filter_by(id=param).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
