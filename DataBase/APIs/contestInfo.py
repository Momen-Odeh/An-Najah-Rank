from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
from authentication import get_Data_from_token
@app.route('/contest-info', methods=['GET'])
def get_contests_info():
    try:
        tokenData = get_Data_from_token(request.args.get('token'))
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

        query = f"""
                    SELECT *
                    FROM challenges 
                    WHERE 
                    ownerUniversityNumber ={ownerUniversityNumber}
                """
        cursor = execute_query(connection, query)
        myChallenges = fetch_results(cursor)

        query = f"""
                    SELECT c.*, cc.max_score, cc.id
                    FROM challenges AS c
                    JOIN contests_challenges AS cc ON c.id = cc.challenge_id
                    WHERE cc.contest_id = {request.args.get('contest_id')}
                """
        cursor = execute_query(connection, query)
        ContestChallenges = fetch_results(cursor)
        response_data = {
            'contest': contest,
            'myChallenges': myChallenges,
            'ContestChallenges': ContestChallenges
        }
        return jsonify(response_data), 200
    except Exception as e:
        return {'message': str(e)}, 409