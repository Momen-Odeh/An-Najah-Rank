from FlaskSetUp import app, get_palestine_date_time
from flask import request, jsonify
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
from guard.professorAccess.AccessContestProfessor import accessContestProfessor
from guard.AccessContest import accessContest
import datetime
import json
from APIs.getContestGrades import get_contests_grades
@app.route('/contest-info', methods=['GET'])
def get_contests_info():
    try:
        tokenData = getattr(request, 'tokenData', None)
        ownerUniversityNumber = tokenData['universityNumber']
        courseId = request.args.get('courseId')
        if request.args.get('contestView'):
            access = accessContest(courseId, request.args.get('contest_id'), ownerUniversityNumber)
        else:
            access = accessContestProfessor(courseId, request.args.get('contest_id'), ownerUniversityNumber)
        if not access:
            return jsonify({"message": "Access Denied"}), 401
        query = f"""
                    SELECT *
                    FROM contests 
                    WHERE 
                    id ='{request.args.get('contest_id')}';
                """
        cursor = connection.cursor()
        cursor.execute(query)
        contest = cursor.fetchone()
        if(tokenData['role'] == "student" and get_palestine_date_time() < contest[3].strftime('%Y-%m-%d %H:%M:%S')):
            return jsonify({"message": "Access Denied"}), 401
        contestData = {
            "id":contest[0],
            "name":contest[1],
            "description":contest[2],
            "startTime":(contest[3]).strftime('%Y-%m-%dT%H:%M:%S'),
            "hasEndTime":contest[4],
            "endTime":(contest[5]).strftime('%Y-%m-%dT%H:%M:%S') if contest[5] != None else contest[5],
            "OwnerUniversityNumber":contest[6]
        }
        query = f"""
                    SELECT *
                    FROM challenges
                    WHERE
                        (ownerUniversityNumber = '{ownerUniversityNumber}'
                        OR challengePrivacy = 'public')
                        AND id IN (SELECT challenge_id FROM test_cases WHERE is_sample = '1');
                """
        cursor = execute_query(connection, query)
        myChallenges = fetch_results(cursor)

        query = f"""
                    SELECT c.*, cc.max_score, cc.challenge_id, cc.contest_id
                    FROM challenges AS c
                    JOIN contests_challenges AS cc ON c.id = cc.challenge_id
                    WHERE cc.contest_id = '{request.args.get('contest_id')}';
                """
        cursor = execute_query(connection, query)
        ContestChallenges = fetch_results(cursor)
        fields = [
            "id", "name", "description", "difficulty", "problem_statement", "input_format", "constraints",
            "output_format", "tags", "created_at", "updated_at", "ownerUniversityNumber","challengePrivacy",
            "challengeLanguage", "maxScore", "challenge_id", "contest_id"
        ]
        ContestChallengesData = []
        for record in ContestChallenges:

            data_object = {}
            for i in range(len(fields)):
                if isinstance(record[i], datetime.datetime):
                    data_object[fields[i]] = record[i].isoformat()
                elif fields[i] == "tags":
                    data_object[fields[i]]=json.loads(record[i])
                elif fields[i] == "id":
                    data_object[fields[i]] = record[i]
                    sqlRate = f"""
                                SELECT
                                (SELECT COUNT(DISTINCT studentUniversityNumber) FROM student_submissions
                                 WHERE 
                                 contestId = '{request.args.get('contest_id')}' AND
                                  courseNumber = '{request.args.get('courseId')}' 
                                 and challengeId ='{record[i]}' AND submissionResult = '100') AS submissionCount,
                                (SELECT COUNT(DISTINCT studentNumber) FROM student_enrollments
                                 WHERE courseNumber = '{request.args.get('courseId')}') AS enrollmentCount;
                                """
                    cursor = execute_query(connection, sqlRate)
                    challengeRate = fetch_results(cursor)[0]
                    if challengeRate[0] == 0 or challengeRate[1] == 0:
                        data_object['challengeRate'] = 0
                    else:
                        data_object['challengeRate'] = round((challengeRate[0]/challengeRate[1])*100,2)
                else:
                    data_object[fields[i]] = record[i]
            # print()
            # print(data_object)
            tried = fetch_results(execute_query(connection, f"""SELECT * FROM student_submissions WHERE 
            studentUniversityNumber = '{ownerUniversityNumber}' 
            AND challengeId = '{data_object['challenge_id']}' 
            AND contestId = '{data_object['contest_id']}';"""), )

            solved = fetch_results(execute_query(connection, f"""SELECT * FROM student_submissions WHERE 
                        studentUniversityNumber = '{ownerUniversityNumber}' 
                        AND challengeId = '{data_object['challenge_id']}' 
                        AND contestId = '{data_object['contest_id']}' AND submissionResult = '100';"""), )

            data_object['tried'] = True if len(tried) > 0 else False
            data_object['solved'] = True if len(solved) > 0 else False

            ContestChallengesData.append(data_object)
        data = []
        if tokenData["role"] == "professor" or tokenData["role"] == "admin":
            data = get_contests_grades(data_object['contest_id'], ContestChallengesData)
        response_data = {
            'contest': contestData,
            'myChallenges': myChallenges,
            'ContestChallenges': ContestChallengesData,
            'contestGrades': data,
            'role': tokenData["role"]
        }
        return jsonify(response_data), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 409