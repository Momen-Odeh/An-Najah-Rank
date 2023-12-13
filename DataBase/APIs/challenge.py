from FlaskSetUp import app
from flask import request, jsonify
import json
from dataBaseConnection import insert_data, update_data, delete_data
from MySQL_SetUp import connection
@app.route('/challenges', methods=['POST'])
def add_challenge():
    try:
        data = request.get_json()
        tokenData = getattr(request, 'tokenData', None)
        ownerUniversityNumber = tokenData['universityNumber']
        converted_tags = json.dumps(data['tags'])
        result = insert_data(
            connection,
            'challenges',
            ['name', 'description', 'difficulty', 'problem_statement', 'input_format', 'constraints', 'output_format',
             'tags','ownerUniversityNumber','challengePrivacy'],
            (data['name'], data['description'], data['difficulty'], data['problem_statement'], data['input_format'],
             data['constraints'], data['output_format'], converted_tags,ownerUniversityNumber,
             "public" if data['challengePrivacy'] is True else "private")
        )
        # get_challenge_id
        sql_query = """
                    SELECT id 
                    FROM challenges 
                    WHERE 
                        name = %s 
                        AND description = %s 
                        AND difficulty = %s 
                        AND problem_statement = %s 
                        AND input_format = %s 
                        AND constraints = %s 
                        AND output_format = %s
                        AND ownerUniversityNumber = %s
                """

        params = (
            data['name'], data['description'], data['difficulty'], data['problem_statement'], data['input_format'],
            data['constraints'], data['output_format'], ownerUniversityNumber
        )
        cursor = connection.cursor()
        cursor.execute(sql_query, params)
        result = cursor.fetchall()
        return jsonify({'message': result[len(result) - 1][0]}), 200
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/get-challenge', methods=['GET'])
def get_challenge_details():
    try:
        query = f"""SELECT * from challenges WHERE id = {request.args.get('challenge_id')}"""
        cursor = connection.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        if result:
            response = {
                'difficulty': result[3],
                'name': result[1],
                'description': result[2],
                'problemStatement': result[4],
                'inputFormat': result[5],
                'constraints': result[6],
                'outputFormat': result[7],
                'tags': json.loads(result[8])
            }
            return jsonify({'message': response}), 200
        else:
            return jsonify({'message': 'Challenge not found'}), 404
    except Exception as e:
        return jsonify({'message': e}), 409

@app.route('/challenges/<int:id>', methods=['PUT'])
def update_challenge(id):
    try:
        data = request.get_json()
        converted_tags = json.dumps(data['tags'])
        condition = 'id = %s'
        new_values = (
            data['name'],
            data['description'],
            data['difficulty'],
            data['problem_statement'],
            data['input_format'],
            data['constraints'],
            data['output_format'],
            converted_tags,
            "public" if data['challengePrivacy'] is True else "private",
            id
        )
        result = update_data(
            connection,
            'challenges',
            ['name', 'description', 'difficulty', 'problem_statement', 'input_format', 'constraints', 'output_format',
             'tags', 'challengePrivacy'],
            new_values,
            condition
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500

@app.route('/challenges/<int:id>', methods=['DELETE'])
def delete_challenge(id):
    try:
        condition = f'id = {id}'
        result = delete_data(
            connection,
            'challenges',
            condition,
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500