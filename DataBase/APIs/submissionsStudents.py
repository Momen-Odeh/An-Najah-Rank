from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify
from guard.professorAccess.AccessChallengeView import accessChallengeViewProfessor

@app.route('/submissions-students', methods=['GET'])
def get_submissions_students():
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if not (role == 'professor' or role == 'admin'):
            return jsonify({"message": "Access Denied"}), 401
        course_id = request.args.get('courseId')
        contest_id = request.args.get('contestId')
        challenge_id = request.args.get('challengeId')
        access = accessChallengeViewProfessor(course_id, contest_id, challenge_id, tokenData['universityNumber'])
        if not access:
            return jsonify({"message": "Access Denied"}), 401
        contest_challenge_details_query = f"SELECT max_score,similarityFileKey FROM contests_challenges WHERE challenge_id = %s AND contest_id = %s "

        cursor = connection.cursor()
        cursor.execute(contest_challenge_details_query,(challenge_id, contest_id))
        contest_challenge = cursor.fetchone()
        last_submissions_query = f"""
            SELECT ss.*, u.fullName
            FROM student_submissions ss
            JOIN (
                SELECT studentUniversityNumber, MAX(submissionTime) AS maxSubmissionTime
                FROM student_submissions
                WHERE courseNumber = '{course_id}'
                  AND challengeId = '{challenge_id}'
                  AND contestId = '{contest_id}'
                GROUP BY studentUniversityNumber
            ) maxTimes ON ss.studentUniversityNumber = maxTimes.studentUniversityNumber AND ss.submissionTime = maxTimes.maxSubmissionTime
            JOIN user u ON ss.studentUniversityNumber = u.universityNumber
            WHERE ss.courseNumber = '{course_id}'
              AND ss.challengeId = '{challenge_id}'
              AND ss.contestId = '{contest_id}';
        """
        cursor.execute(last_submissions_query)
        result = cursor.fetchall()

        submissions=[]
        for item in result:
            submissions.append({
                "score": (contest_challenge[0] * item[6]) / 100,
                "submissionDate": item[5],
                "similarity": item[10],
                "studentUniversityNumber": item[1],
                "studentName": item[11]
            })
        if contest_challenge[1] != None and contest_challenge[1] != "in progress":
            simState = "similarity file exist"
        else:
            simState = contest_challenge[1]
        return jsonify({"submissions": submissions, "maxScore": contest_challenge[0], "similarityState":simState }), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500