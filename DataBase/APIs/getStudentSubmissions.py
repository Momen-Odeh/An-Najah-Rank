from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify
from fileManagment.getLanguageType import get_language_type
from fileManagment.getFileContent import get_file_content
from APIs.student_submissions import get_test_cases

@app.route('/submissions-manual-marking', methods=['GET'])
def get_submissions_manual_marking():
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if role != 'professor':
            return {'message': ""}, 401
        student_university_number = request.args.get('studentUniversityNumber')
        course_id = request.args.get('courseId')
        contest_id = request.args.get('contestId')
        challenge_id = request.args.get('challengeId')
        contest_challenge_details_query = f"SELECT max_score FROM contests_challenges WHERE challenge_id = %s AND contest_id = %s "

        cursor = connection.cursor()
        cursor.execute(contest_challenge_details_query,(challenge_id, contest_id))
        maxScore = cursor.fetchone()
        submission_query = f"SELECT * FROM student_submissions WHERE studentUniversityNumber = '{student_university_number}' " \
                           f"AND courseNumber = '{course_id}' AND challengeId = '{challenge_id}' AND contestId = '{contest_id}'" \
                           f"ORDER BY submissionTime DESC"
        cursor.execute(submission_query)
        result = cursor.fetchall()
        is_last_submission = True
        submissions=[]
        for item in result:
            test_cases = f"SELECT testCaseId, status, stdout, stderr FROM submission_testCases WHERE submissionId = '{item[0]}'"
            cursor.execute(test_cases)
            data = cursor.fetchall()
            testCasesOut = [{"testCaseId": testCase[0], "status": testCase[1], "stdout": testCase[2], "stderr": testCase[3]} for testCase in data]
            key = item[4]
            code = get_file_content(key)
            language = get_language_type(key)
            submissions.append({
                "submissionId": item[0],
                "score": item[6],
                "submissionDate": item[5],
                "language": language,
                "submissionStatus": True if item[6] == 100 else False,
                "code": code,
                "compileError": item[7],
                "testCaseOutput": testCasesOut,
                "manualMark": is_last_submission
            })
            is_last_submission = False
        testCases = get_test_cases(challenge_id)
        return jsonify({"submissions": submissions, "testCases": testCases}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500