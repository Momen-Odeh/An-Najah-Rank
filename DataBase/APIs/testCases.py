from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, update_data, delete_data, execute_query, fetch_results
from MySQL_SetUp import connection
from APIs.runNewTestCase import run_new_test_case

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

        sql_query = """ 
                    SELECT id
                    FROM test_cases 
                    WHERE 
                        challenge_id = %s 
                        AND input_data = %s 
                        AND output_data = %s 
                        AND strength = %s 
                        AND is_sample = %s
                """
        is_sample = 1 if data['is_sample'] == True else 0
        params = (
            data['challenge_id'],
            data['input_data'],
            data['output_data'],
            data['strength'],
            is_sample,
        )
        cursor = connection.cursor()
        cursor.execute(sql_query, params)
        result = cursor.fetchall()
        return jsonify({'message': result[len(result) - 1][0]}), 200
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
        return jsonify({'message': "ok"}), 200
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