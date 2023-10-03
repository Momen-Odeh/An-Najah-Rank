import jwt
import datetime

SECRET_KEY = 'Noor_Aldeen_$%!~_@2002@_^&*'

def is_token_valid(token):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        current_time = datetime.datetime.utcnow()
        token_exp = datetime.datetime.fromtimestamp(decoded_token['exp'])
        if token_exp > current_time:
            return True
        else:
            return False
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False

def generate_token(email, password, expiredTime):
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=expiredTime)
    payload = {
        'email': email,
        'password': password,
        'exp': expiration_time
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token