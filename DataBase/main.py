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
from APIs.contests import add_contest
from APIs.contestInfo import get_contests_info
from APIs.contestChallenges import add_challenge_in_contest
from APIs.user import getUserInfo,UpdateUserImg,getUserImg,UpdateUser,updatePasswordSettings,DeleteUser
CORS(app)



if __name__ == "__main__":
    app.run(debug=True)
