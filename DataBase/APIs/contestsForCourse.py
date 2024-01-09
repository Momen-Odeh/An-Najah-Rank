from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query, fetch_results

def getContestForCourse(id,studendCount):
    try:
        challenge_query = f"SELECT * FROM contests WHERE courseNumber = {id};"
        challenges = fetch_results(execute_query(connection, challenge_query))
        contest_objects = []
        cursor = connection.cursor()

        for row in challenges:
            cursor.execute(f"SELECT fullName FROM user WHERE universityNumber = {row[6]}")
            sqlMax = f"""
                        SELECT sum(max_score) as max_score_sum FROM `an-najah rank`.contests_challenges
                        where contest_id = '{row[0]}';
                        """
            maxVal = fetch_results(execute_query(connection, sqlMax))[0][0]
            sqlRate = f"""
                SELECT cc.contest_id, cc.challenge_id,ss.studentUniversityNumber,ss.submissionResult
                FROM contests_challenges cc
                inner join student_submissions ss on cc.challenge_id=ss.challengeId
                where contest_id = '{row[0]}' and ss.submissionResult = '100' 
                group by ss.studentUniversityNumber
                having count(DISTINCT ss.courseNumber, ss.contestId, ss.challengeId) = (select count(challenge_id) FROM contests_challenges 
                where contest_id = '{row[0]}')
                order by ss.studentUniversityNumber;
                            """
            rate = fetch_results(execute_query(connection, sqlRate))
            if (len(rate) != 0):
                rate = round((len(rate)/studendCount)*100, 2)
            else:
                rate = 0
            maxScoreVal = float(maxVal) if maxVal is not None else None
            contest = {
                "id": row[0],
                "name": row[1],
                "startDate": row[3].strftime('%Y-%m-%d %H:%M:%S'),
                "endDate": row[5].strftime('%Y-%m-%d %H:%M:%S')if row[4] == 1 else row[5],
                "ownerName": cursor.fetchone(),
                'solved': False,
                "statistics": [
                    {'key': 'Solved Rate: ', "val": f"{rate}%"},
                    {'key': 'max Score: ', "val": maxScoreVal} if maxScoreVal is not None else {}
                ]
            }
            contest_objects.append(contest)

        return contest_objects
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
        }
