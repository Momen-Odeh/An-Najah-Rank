from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, update_data, delete_data
from MySQL_SetUp import connection
@app.route('/contests-challenges', methods=['POST'])
def add_challenge_in_contest():
    try:
        data = request.get_json()
        result = insert_data(
            connection,
            'contests_challenges',
            ['challenge_id', 'contest_id', 'max_score'],
            (data['challenge_id'], data['contest_id'], data['max_score'])
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/contests-challenges-id', methods=['GET'])
def get_challenge_in_contest_id():
    try:
        sql_query = """
            SELECT id 
            FROM contests_challenges 
            WHERE 
                challenge_id = %s 
                AND contest_id = %s 
                AND max_score = %s
        """
        params = (
            request.args.get('challenge_id'),
            request.args.get('contest_id'),
            request.args.get('max_score')
        )
        print (params)
        cursor = connection.cursor()
        cursor.execute(sql_query, params)
        result = cursor.fetchall()
        return jsonify({'message': result[len(result)-1][0]}), 200
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/contests-challenges/<int:id>', methods=['PUT'])
def update_challenge_in_contest(id):
    try:
        data = request.get_json()
        condition = 'id = %s'
        new_values = (
            data['challenge_id'],
            data['contest_id'],
            data['max_score'],
            id
        )
        result = update_data(
            connection,
            'contests_challenges',
            ['challenge_id', 'contest_id', 'max_score'],
            new_values,
            condition
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500

@app.route('/contests-challenges/<int:id>', methods=['DELETE'])
def delete_challenge_in_contest(id):
    try:
        condition = f'id = {id}'
        result = delete_data(
            connection,
            'contests_challenges',
            condition,
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500