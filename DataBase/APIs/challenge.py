from FlaskSetUp import app
from flask import request, jsonify
import json
from dataBaseConnection import insert_data, update_data, delete_data
from MySQL_SetUp import connection

@app.route('/challenges', methods=['POST'])
def add_challenge():
    try:
        data = request.get_json()
        print(data)
        converted_tags = json.dumps(data['tags'])
        result = insert_data(
            connection,
            'challenges',
            ['name', 'description', 'difficulty', 'problem_statement', 'input_format', 'constraints', 'output_format',
             'tags'],
            (data['name'], data['description'], data['difficulty'], data['problem_statement'], data['input_format'],
             data['constraints'], data['output_format'], converted_tags)
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/challenges', methods=['GET'])
def get_challenge_id():
    try:
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
                AND JSON_CONTAINS(tags, %s)
        """
        print(request.args.get('tags'))
        params = (
            request.args.get('name'),
            request.args.get('description'),
            request.args.get('difficulty'),
            request.args.get('problem_statement'),
            request.args.get('input_format'),
            request.args.get('constraints'),
            request.args.get('output_format'),
            request.args.get('tags')
        )
        cursor = connection.cursor()
        cursor.execute(sql_query, params)
        result = cursor.fetchall()
        return jsonify({'message': result[len(result)-1][0]}), 200
    except Exception as e:
        return {'message': str(e)}, 409

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
            id
        )
        result = update_data(
            connection,
            'test_cases',
            ['name', 'description', 'difficulty', 'problem_statement', 'input_format', 'constraints', 'output_format',
             'tags'],
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