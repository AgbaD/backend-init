from . import db
from datetime import datetime
from flask import current_app

class User(db.models):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    email = db.Column(db.String(256), unique=True)

    def __repr__(self):
        return f'User(Fullname: {self.first_name} {self.last_name}, email: {self.email})'

        