from flask import jsonify, request
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query, fetch_results
from guard.AccessChallenge import accessChallenge
from guard.professorAccess.AccessChallengeProfessor import accessChallengeProfessor
import json

@app.route('/challenge/<int:id>', methods=['GET'])
def getChallenge(id):
    try:
        courseId = request.args.get('courseId')
        contestId = request.args.get('contestId')
        tokenData = getattr(request, 'tokenData', None)
        universityNumber = tokenData['universityNumber']
        if courseId:
            access = accessChallenge(courseId, contestId, id, universityNumber)
        else:
            access = accessChallengeProfessor(id, universityNumber)
        if not access:
            return jsonify({"message": "Access Denied"}), 401

        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM challenges where id = '{id}';")
        result = cursor.fetchone()
        if courseId:
            resultTestCases = fetch_results(execute_query(connection, f"""SELECT * FROM test_cases where
                                                                  challenge_id = '{id}' AND is_sample = '1';"""), )
        else:
            resultTestCases = fetch_results(execute_query(connection, f"""SELECT * FROM test_cases where
                                                                              challenge_id = '{id}' """), )
        related_contests = fetch_results(execute_query
                                         (connection,
                                          f"""select c.id, c.name, c.courseNumber, co.name from contests_challenges cc 
                                              join contests c on cc.contest_id=c.id
                                              join courses co on co.courseNumber = c.courseNumber
                                              join student_submissions ss on ss.contestId = c.id
                                              where cc.challenge_id = '{id}' group by ss.contestId;
                                          ;"""), )
        related_contests = [{"contestId": related_contest[0], "contestName": related_contest[1],
                            "courseNumber": related_contest[2], "courseName": related_contest[3]}
                           for related_contest in related_contests]
        test_case_objects = []
        for row in resultTestCases:
            test_case = {
                "id": row[0],
                "challenge_id": row[1],
                "input_data": row[2],
                "output_data": row[3],
                "strength": row[4],
                "is_sample": row[5],
                "explanation": row[6]
            }
            test_case_objects.append(test_case)

        print(resultTestCases)
        if len(result) != 0:
            # id, name, description, difficulty, problem_statement, input_format, constraints, output_format, tags, created_at, updated_at
            sql = f"""
                            SELECT cc.max_score,count(ss.id) as total_submission FROM contests_challenges cc
                            left join student_submissions ss on cc.challenge_id = ss.challengeId and cc.contest_id = ss.contestId
                            where challenge_id='{id}' and contest_id='{contestId}'
                            """
            stat = fetch_results(execute_query(connection, sql), )
            print(stat)
            return jsonify({
                    "status": f"ok",
                    "id": result[0],
                    "name": result[1],
                    "description": result[2],
                    "difficulty": result[3],
                    "problem_statement": result[4],
                    "inputFormat": result[5],
                    "constraints": result[6],
                    "outputFormat": result[7],
                    "challengePrivacy": True if result[12] == "public" else False,
                    "tags": json.loads(result[8]),
                    "created_at": result[9],
                    "updated_at": result[10],
                    "testCases": test_case_objects,
                    "max_score":stat[0][0],
                    "total_submission": stat[0][1],
                    "relatedContests": related_contests,
                            }), 200
        else:
            return jsonify({
                    "status": f"not found",
                            }), 404
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400
