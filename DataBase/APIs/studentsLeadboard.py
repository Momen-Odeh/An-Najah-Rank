from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify

@app.route('/students-leadboard', methods=['GET'])
def get_students_leadboard():
    try:
        course_id = request.args.get('courseId')
        contest_id = request.args.get('contestId')
        challenge_id = request.args.get('challengeId')
        contest_challenge_details_query = f"SELECT max_score FROM contests_challenges WHERE challenge_id = %s AND contest_id = %s "

        cursor = connection.cursor()
        cursor.execute(contest_challenge_details_query, (challenge_id, contest_id))
        maxScore = cursor.fetchone()
        last_submissions_query = f"""
            SELECT ss.submissionTime, ss.submissionResult, u.fullName,u.universityNumber
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
                "score": (maxScore[0] * item[1]) / 100,
                "submissionDate": item[0],
                "studentName": item[2],
                "studentUniversityNumber": item[3]
            })
        return jsonify({"submissions": submissions, "maxScore": maxScore[0]}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500