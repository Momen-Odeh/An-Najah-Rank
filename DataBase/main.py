from flask import request, jsonify
from EmailAuth.emailConnection import sendEmail
from FlaskSetUp import app
from APIs.registration import register_user
from APIs.login import login_user
from authentication import get_Data_from_token
from flask_cors import CORS
from EmailAuth.createVerificationCode import createVerificationCode
from EmailAuth.verifyCode import verifyCode, deleteCode, updateUserStatusAuth
from EmailAuth.updatePassword import updatePassword
from EmailAuth.forgetPassword import forgetPassword
from APIs.challengeInfo import getChallenge
from APIs.challenge import add_challenge, get_challenge_id, update_challenge, delete_challenge, get_challenge_details
from APIs.testCases import add_test_case, get_testCase_id, get_testCases, delete_test_case, update_test_case
CORS(app)

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

@app.route('/checkCode', methods=['POST'])  # Not Need to API called after register
def create():
    return createVerificationCode("momen.odeh74@gmail.com")



if __name__ == "__main__":
    app.run(debug=True)
