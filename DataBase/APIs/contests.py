from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, update_data, delete_data
from MySQL_SetUp import connection
from authentication import get_Data_from_token
@app.route('/contests', methods=['POST'])
def add_contest():
    try:
        data = request.get_json()
        tokenData = get_Data_from_token(data['token'])
        ownerUniversityNumber = tokenData['universityNumber']
        result = insert_data(
            connection,
            'contests',
            ['name', 'description', 'startTime', 'hasEndTime', 'endTime', 'OwnerUniversityNumber', 'courseNumber'],
            (data['name'], data['description'], data['startTime'], data['hasEndTime'], data['endTime'],
             ownerUniversityNumber, data['courseNumber'])
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/contest_id', methods=['GET'])
def get_contests_id():
    try:
        sql_query = """
            SELECT id 
            FROM contests 
            WHERE 
                name = %s 
                AND description = %s 
                AND startTime = %s 
                AND hasEndTime = %s 
                AND endTime = %s 
                AND OwnerUniversityNumber = %s 
                AND courseNumber = %s
        """
        hasEndTime = 1 if request.args.get('hasEndTime') and request.args.get('hasEndTime').lower() == 'true' else 0
        tokenData = get_Data_from_token(request.args.get('token'))
        ownerUniversityNumber = tokenData['universityNumber']
        params = (
            request.args.get('name'),
            request.args.get('description'),
            request.args.get('startTime'),
            hasEndTime,
            request.args.get('endTime'),
            ownerUniversityNumber,
            request.args.get('courseNumber')
        )
        print(params)
        cursor = connection.cursor()
        cursor.execute(sql_query, params)
        result = cursor.fetchall()
        return jsonify({'message': result[len(result)-1][0]}), 200
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/contests/<int:id>', methods=['PUT'])
def update_contest(id):
    try:
        data = request.get_json()
        condition = 'id = %s'
        new_values = (
            data['name'],
            data['description'],
            data['startTime'],
            data['hasEndTime'],
            data['endTime'],
            id
        )
        print(new_values)
        result = update_data(
            connection,
            'contests',
            ['name', 'description', 'startTime', 'hasEndTime', 'endTime'],
            new_values,
            condition
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500

@app.route('/contests/<int:id>', methods=['DELETE'])
def delete_contest(id):
    try:
        condition = f'id = {id}'
        result = delete_data(
            connection,
            'contests',
            condition,
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500