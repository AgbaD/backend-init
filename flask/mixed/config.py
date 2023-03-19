import os
from dotenv import load_dotenv


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @static_method
    def init_app(app):
        pass

class Development_config(Config):
    SQLALCHEMY_DATABASE_URI = ""
    DEBUG = True
    
class Production_config(Congif):
    SQLALCHEMY_DATABASE_URI = ""


config = {
    "development": Development_config,
    "production": Production_config,
    "default": Development_config
}

