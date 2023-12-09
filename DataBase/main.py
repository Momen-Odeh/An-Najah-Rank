from flask import request, jsonify
from FlaskSetUp import app
from flask import request, jsonify, render_template
from FlaskSetUp import app, socketio
from flask_cors import CORS
from EmailAuth.emailConnection import sendEmail
from APIs.registration import register_user
from APIs.login import login_user
from authentication import get_Data_from_token
from EmailAuth.createVerificationCode import createVerificationCode
from EmailAuth.verifyCode import verifyCode, deleteCode, updateUserStatusAuth
from EmailAuth.updatePassword import updatePassword
from EmailAuth.forgetPassword import forgetPassword
from APIs.challengeInfo import getChallenge
from APIs.challenge import add_challenge, update_challenge, delete_challenge, get_challenge_details
from APIs.testCases import add_test_case, get_testCases, delete_test_case, update_test_case
from APIs.contests import add_contest
from APIs.contestInfo import get_contests_info
from APIs.contestChallenges import add_challenge_in_contest
from APIs.user import getUserInfo,UpdateUserImg,getUserImg,UpdateUser,updatePasswordSettings,DeleteUser
from APIs.course import add_course
from APIs.courseInfo import get_course_info
from APIs.course_moderators import add_course_moderators
from APIs.student_enrollments import add_student_enrollments
from APIs.challengesCoursesAdministration import getChallengesForOwner
from APIs.contestsForCourse import getContestForCourse
from authentication import check_token
from APIs.admin import get_professor_pending
from APIs.UserCourses import getUserCourses
from authAPIs import validate_token
from APIs.student_submissions import add_challenge_student
from APIs.getSubmission import get_submission_info
from APIs.runCode import run_challenge_code
from FileSimilarity import fileSimilarity
from APIs.getStudentSubmissions import get_submissions_manual_marking
from APIs.submissionsStudents import get_submissions_students
from APIs.updateSubmissionScore import update_submission_score
from APIs.studentsLeadboard import get_students_leadboard
from guard.professorAccess import haveAccess
from Notification.getNotifications import get_notifications
from APIs.latestChallenge import getLastChallenges
from APIs.runNewTestCase import run_new_test_case


@app.route('/flask', methods=['GET'])
def index():
    # Access the token data from the request object
    return jsonify({'message': getattr(request, 'tokenData', None)})

if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)