from flask import request, jsonify
from EmailAuth.emailConnection import sendEmail
from FlaskSetUp import app
from APIs.registration import register_user
from APIs.login import login_user
from authentication import get_Data_from_token
from flask_cors import CORS

CORS(app)

@app.route('/register', methods=['POST'])
def register():
    return register_user()

@app.route('/login',methods=['GET'])
def login():
    return login_user()

@app.route('/checktoken',methods=['GET'])
def check_token():
    return jsonify({"result": get_Data_from_token(request.args.get('token'))}),200

@app.route('/sendEmail', methods=['POST'])
def mailAPI():
    if request.is_json:
        try:
            data = request.get_json()
            email = data.get('email')
            title = data.get('title')
            body = "reset password body"
            return sendEmail(email,title,body)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400

if __name__ == "__main__":
    app.run(debug=True)
