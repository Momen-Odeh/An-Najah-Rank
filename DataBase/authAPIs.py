from flask import request, jsonify,abort
from FlaskSetUp import app
from authentication import get_Data_from_token

excluded_routes = ['/checkToken', '/login', '/forgetPassword',
                   '/verfiyCode', '/updatePassword', '/register',
                   '/userStatusAuth']
def should_skip_token_validation():
    return request.path in excluded_routes

def validate_token():
    token = request.args.get('token')
    if token is None or len(token ) == 0:
        return False

    decodeToken = get_Data_from_token(token)
    request.tokenData = decodeToken
    return len(decodeToken) > 2

#
@app.before_request
def before_request():
    if should_skip_token_validation():
        return
    valid = validate_token()
    print("MIDDLEWARE","valid",valid ,request.path, "token ==>", request.args.get('token'))
    if not valid:
        abort(401)
