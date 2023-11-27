from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify
from fileManagment.getLanguageType import get_language_type
from fileManagment.getFileContent import get_file_content
@app.route('/submission-info', methods=['GET'])
def get_submission_info():
    try:
        tokenData = getattr(request, 'tokenData', None)
        student_university_number = tokenData['universityNumber']
        print(student_university_number)
        submission_id = request.args.get('SubmissionId')
        contest_id = request.args.get('contestId')
        challenge_id = request.args.get('challengeId')
        contest_challenge_details_query = f"SELECT max_score FROM contests_challenges WHERE challenge_id = %s " \
                                          f"AND contest_id = %s "

        submission_query = f"SELECT * FROM student_submissions WHERE " \
                           f"studentUniversityNumber = '{student_university_number}' " \
                           f"AND id = '{submission_id}'"

        test_cases = f"SELECT status FROM submission_testCases WHERE submissionId = '{submission_id}'"
        cursor = connection.cursor()
        cursor.execute(submission_query)
        result = cursor.fetchone()
        if not result:
            return jsonify({"message": "Access Denied"}), 401
        cursor.execute(contest_challenge_details_query,(challenge_id, contest_id))
        maxScore = cursor.fetchone()
        cursor.execute(test_cases)
        data = cursor.fetchall()
        testCasesStatus = [item[0] for item in data]
        key = result[4]
        code = get_file_content(key)
        language = get_language_type(key)
        submission = {
            "score": (maxScore[0]*result[6])/100,
            "submissionTime": result[5],
            "language": language,
            "result": "Accepted" if result[6]==100 else "Wrong Answer",
            "code": code,
            "testCasesStatus": testCasesStatus
        }
        return jsonify({"submission": submission}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500