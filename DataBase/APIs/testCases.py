from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, update_data, delete_data, execute_query, fetch_results
from MySQL_SetUp import connection
@app.route('/test_cases', methods=['POST'])
def add_test_case():
    try:
        data = request.get_json()
        result = insert_data(
            connection,
            'test_cases',
            ['challenge_id', 'input_data', 'output_data', 'strength', 'is_sample', 'explanation'],
            (data['challenge_id'], data['input_data'], data['output_data'], data['strength'], data['is_sample'], data['explanation'])
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/test_cases', methods=['GET'])
def get_testCase_id():
    try:
        sql_query = """ 
            SELECT id
            FROM test_cases 
            WHERE 
                challenge_id = %s 
                AND input_data = %s 
                AND output_data = %s 
                AND strength = %s 
                AND is_sample = %s
                AND explanation = %s
        """
        is_sample = 1 if request.args.get('is_sample', '').lower() == 'true' else 0

        params = (
            request.args.get('challenge_id'),
            request.args.get('input_data'),
            request.args.get('output_data'),
            request.args.get('strength'),
            is_sample,
            request.args.get('explanation')
        )
        cursor = connection.cursor()
        cursor.execute(sql_query, params)
        result = cursor.fetchall()
        return jsonify({'message': result[len(result)-1][0]}), 200
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/test_cases/get', methods=['GET'])
def get_testCases():
    try:
        sql_query = f""" 
            SELECT *
            FROM test_cases 
            WHERE 
            challenge_id = {request.args.get('challenge_id')}
        """
        cursor = execute_query(connection, sql_query)
        result = fetch_results(cursor)
        return jsonify({'message': result}), 200
    except Exception as e:
        return {'message': str(e)}, 409


@app.route('/test_cases/<int:id>', methods=['PUT'])
def update_test_case(id):
    try:
        data = request.get_json()
        condition = 'id = %s'
        new_values = (
            data['challenge_id'],
            data['input_data'],
            data['output_data'],
            data['strength'],
            data['is_sample'],
            data['explanation'],
            id
        )
        result = update_data(
            connection,
            'test_cases',
            ['challenge_id', 'input_data', 'output_data', 'strength', 'is_sample', 'explanation'],
            new_values,
            condition
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500

@app.route('/test_cases/<int:id>', methods=['DELETE'])
def delete_test_case(id):
    try:
        condition = f'id = {id}'
        result = delete_data(
            connection,
            'test_cases',
            condition,
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500