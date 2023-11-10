import jwt
from flask import request, jsonify
from FlaskSetUp import app
SECRET_KEY = 'Noor_Aldeen_$%!~_@2002@_^&*'

def get_Data_from_token(token):
    try:
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return {'valid': True, 'email': decoded_token['email'], 'universityNumber': decoded_token['universityNumber'], 'name': decoded_token['name'], 'role': decoded_token['role']}
    except jwt.ExpiredSignatureError:
        return jsonify({'valid': False, 'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'valid': False, 'message': 'Invalid token'}), 401

def generate_token(email, universityNumber, name, role):
    payload = {
        'email': email,
        'universityNumber': universityNumber,
        'name': name,
        'role': role
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

@app.route('/checkToken', methods=['GET'])
def check_token():
        return get_Data_from_token(request.args.get('token'))
