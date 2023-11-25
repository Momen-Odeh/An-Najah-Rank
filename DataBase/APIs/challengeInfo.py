from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query,fetch_results
import json

@app.route('/challenge/<id>', methods=['GET'])
def getChallenge(id):
    try:
        print('--------------AAAAAAA-----------------')
        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM challenges where id = {id}")
        result = cursor.fetchone()
        print(result)
        print('-------------------------------')
        resultTestCases = fetch_results(execute_query(connection, f"SELECT * FROM test_cases where challenge_id = {id} AND is_sample = 1;"), )
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
            return {
                    "status": f"ok",
                    "id": result[0],
                    "name":result[1],
                    "description": result[2],
                    "difficulty":result[3],
                    "problem_statement": result[4],
                    "inputFormat": result[5],
                    "constraints": result[6],
                    "outputFormat": result[7],
                    "tags": json.loads(result[8]),
                    "created_at": result[9],
                    "updated_at": result[10],
                    "testCases":test_case_objects
                            }, 200
        else:
            return jsonify({
                    "status": f"not found",
                            }), 404
    except Exception as e:
        return jsonify({
            "status":"error",
            "error": e,
        }), 400
