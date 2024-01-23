from flask import request, jsonify,abort, make_response
from FlaskSetUp import app
from authentication import get_Data_from_token

excluded_routes = ['/login', '/forgetPassword',
                   '/verfiyCode', '/updatePassword', '/register',
                   '/userStatusAuth', '/',"/resendVerificationCode"]
def should_skip_token_validation():
    return request.path in excluded_routes

def validate_token():
    token = request.headers.get('Authorization') #request.args.get('token')
    if token is None or len(token) == 0:
        return False

    decodeToken = get_Data_from_token(token)
    request.tokenData = decodeToken
    return len(decodeToken) > 2

#
@app.before_request
def before_request():
    if should_skip_token_validation():
        return
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        return response
    valid = validate_token()
    print("MIDDLEWARE: ","valid ==>",valid ,"path ==>",request.path, "token ==>", request.headers.get('Authorization'))
    if not valid:
        abort(401)
