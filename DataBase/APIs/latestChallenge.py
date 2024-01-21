from FlaskSetUp import app
from flask import request, jsonify, send_file
from dataBaseConnection import execute_query, fetch_results, update_data, delete_data
from MySQL_SetUp import connection


@app.route('/latestChallengesProfile', methods=['GET'])
def getLastChallenges():
    try:
        tokenData = getattr(request, 'tokenData', None)

        sql = f"""
                SELECT 
                    ss.challengeId, ss.contestId, ss.courseNumber, ss.studentUniversityNumber, c.name, c.difficulty,
                    ss.submissionResult, cc.max_score, ss.submissionTime
                FROM
                    `an-najah rank`.student_submissions ss
                INNER JOIN
                    challenges c ON ss.challengeId = c.id
                INNER JOIN
                    contests_challenges cc ON ss.challengeId = cc.challenge_id
				INNER JOIN 
					student_submissions sts ON  sts.submissionTime = 
                    (select max(submissionTime) from student_submissions where studentUniversityNumber = 
                    '{tokenData['universityNumber']}' )
                WHERE
                    ss.studentUniversityNumber = '{tokenData['universityNumber']}' 
                    GROUP BY
                    ss.challengeId,
                    ss.contestId,
                    ss.courseNumber
                    ORDER BY
                    MAX(ss.submissionTime) DESC limit 5;
                        """
        cursor = execute_query(connection, sql)
        result = fetch_results(cursor)
        challenges = []
        for row in result:
            challenges.append({
                "challengeId": row[0],
                "contestId": row[1],
                "courseNumber": row[2],
                "studentUniversityNumber": row[3],
                "name": row[4],
                "difficulty": row[5],
                "submissionResult": row[6],
                "max_score": row[7],
                "submissionTime": row[8],
            })
        print(result)
        return {"challenges": challenges}, 200
    except Exception as e:
        return {"error": e}, 409
