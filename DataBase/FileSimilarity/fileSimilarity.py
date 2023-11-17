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
    print(result)
    return result
