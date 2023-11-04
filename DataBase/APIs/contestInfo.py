from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
from authentication import get_Data_from_token
import datetime
import json
@app.route('/contest-info', methods=['GET'])
def get_contests_info():
    try:
        tokenData = get_Data_from_token(request.args.get('token'))
        print("token", tokenData)
        ownerUniversityNumber = tokenData['universityNumber']
        query = f"""
                    SELECT *
                    FROM contests 
                    WHERE 
                    id ={request.args.get('contest_id')}
                """
        cursor = connection.cursor()
        cursor.execute(query)
        contest = cursor.fetchone()
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
                    ownerUniversityNumber ={ownerUniversityNumber}
                """
        cursor = execute_query(connection, query)
        myChallenges = fetch_results(cursor)

        query = f"""
                    SELECT c.*, cc.max_score, cc.challenge_id, cc.contest_id
                    FROM challenges AS c
                    JOIN contests_challenges AS cc ON c.id = cc.challenge_id
                    WHERE cc.contest_id = {request.args.get('contest_id')}
                """
        cursor = execute_query(connection, query)
        ContestChallenges = fetch_results(cursor)
        fields = [
            "id", "name", "description", "difficulty", "problem_statement", "input_format", "constraints",
            "output_format", "tags", "created_at", "updated_at", "ownerUniversityNumber",
            "maxScore", "challenge_id", "contest_id"
        ]
        ContestChallengesData = []
        for record in ContestChallenges:
            data_object = {}
            for i in range(len(fields)):
                if isinstance(record[i], datetime.datetime):
                    data_object[fields[i]] = record[i].isoformat()
                elif fields[i] == "tags":
                    data_object[fields[i]]=json.loads(record[i])
                else:
                    data_object[fields[i]] = record[i]
            ContestChallengesData.append(data_object)
        response_data = {
            'contest': contestData,
            'myChallenges': myChallenges,
            'ContestChallenges': ContestChallengesData
        }
        return jsonify(response_data), 200
    except Exception as e:
        return {'message': str(e)}, 409