from flask import request, jsonify
from FlaskSetUp import app
from authentication import get_Data_from_token

excluded_routes = ['/checkToken', '/login', '/forgetPassword',
                   '/verfiyCode', '/updatePassword', '/register',
                   '/userStatusAuth']
def should_skip_token_validation():
    return request.path in excluded_routes

def validate_token():
    # Get the token from the request headers
    print("API URI Path ==> ",request.path)
    if should_skip_token_validation():
        return

    token = request.headers.get('Authorization')
    token = token.split(' ', 1)[1]
    if not token:
        return jsonify({'error': 'Token is missing'}), 401
    decoded_token = get_Data_from_token(token)
    request.token_data = decoded_token
#
@app.before_request
def before_request():
    return validate_token()


