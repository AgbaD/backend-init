from . import api
from flask import jsonify

@api.route('/')
def index():
    return jsonify({
        'status': 'success',
        'msg': 'connection is up!'
    })


