import jwt
import datetime

SECRET_KEY = 'Noor_Aldeen_$%!~_@2002@_^&*'

def get_Data_from_token(token):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return {'email': decoded_token['email'], 'name': decoded_token['name'], 'role': decoded_token['role']}
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False

def generate_token(email, name, role):
    payload = {
        'email': email,
        'name': name,
        'role': role
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token