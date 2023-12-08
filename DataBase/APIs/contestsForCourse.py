from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query, fetch_results

def getContestForCourse(id):
    try:
        challenge_query = f"SELECT * FROM contests WHERE courseNumber = {id};"
        tokenData = getattr(request, 'tokenData', None)
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

            if(tokenData['role'] == 'student'):
                sqlRate = f"""
                            SELECT submissionResult, max(submissionTime)as time FROM `an-najah rank`.student_submissions
                             where studentUniversityNumber ='{tokenData['universityNumber']}' ;
                            """
                rate = fetch_results(execute_query(connection, sqlRate))
                if(len(rate) != 0):
                    rate = rate[0][0]
                else:
                    rate = 0
            else:
                sqlRate = f"""
                            SELECT
                            id,
                            studentUniversityNumber,
                            courseNumber,
                            challengeId,
                            submissionTime,
                            submissionResult,
                            contestId,
                            AVG(submissionResult) AS avgSubmissionResult
                        FROM
                            `an-najah rank`.student_submissions
                        WHERE
                            courseNumber = '{id}'
                            AND contestId = '{row[0]}'
                            AND (studentUniversityNumber, submissionTime) IN (
                                SELECT
                                    studentUniversityNumber,
                                    MAX(submissionTime) AS maxSubmissionTime
                                FROM
                                    `an-najah rank`.student_submissions
                                WHERE
                                    courseNumber = '{id}'
                                    AND contestId = '{row[0]}'
                                GROUP BY
                                    studentUniversityNumber
                            );

                            """
                rate = fetch_results(execute_query(connection, sqlRate))
                print(id,row[0],rate)
                if (len(rate) != 0):
                    if rate[0][-1] is None:
                        rate = 0
                    else:
                        rate = int(rate[0][-1])
                else:
                    rate = 0
            contest = {
                "id": row[0],
                "name": row[1],
                "startDate": row[3],
                "endDate": row[5],
                "ownerName": cursor.fetchone(),
                'solved': True,
                # "statistics": [
                #     {'key': 'Solved Rate: ', "val": f"{rate}%"},#******************************************************
                #     {'key': 'max Score: ', "val": maxVal}
                # ]
            }
            contest_objects.append(contest)

        return contest_objects
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
        }
