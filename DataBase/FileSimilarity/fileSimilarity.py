from FileSimilarity.SimilarityAWS import storeSimilarityAWS,getFileSimilarityAWS
from FlaskSetUp import app
from flask import request, jsonify, send_file
from dataBaseConnection import execute_query, fetch_results, update_data, delete_data
from MySQL_SetUp import connection

from FileSimilarity.calculateSimilariy import calculateSimilariy


@app.route('/file-Similarity', methods=['POST'])
def FileSimilarity():
    body = request.get_json()
    challengeId = body["challengeId"]
    contestId = body["contestId"]
    result = calculateSimilariy()
    result = {
        "challengeId":challengeId,
        "contestId":contestId,
        "filesSimilarity": result
    }
    key = storeSimilarityAWS(result,contestId,challengeId)
    update_data(connection, 'contests_challenges', ["similarityFileKey"], (key),
                f"(contest_id = '{contestId}' and challenge_id = '{challengeId}')")
    print(key)
    return result

@app.route('/file-Similarity', methods=['GET'])
def getFileSimilarity():
    try:
        params = request.args
        contestId = params['contestId']
        challengeId = params['challengeId']
        sql = f"""
        SELECT similarityFileKey FROM `an-najah rank`.contests_challenges
         where challenge_id= '{challengeId}' and contest_id = '{contestId}';
        """
        cursor = execute_query(connection,sql)
        key = fetch_results(cursor)
        if len(key) == 0:
            return {"message":"not found contest or challenge"}, 404
        key = key[0][0]
        if key is None:
            return {"message": "not found similarity file"}, 404
        fileContent = getFileSimilarityAWS(key)
        return fileContent,200
    except Exception as e:
        return {"error": e}, 409