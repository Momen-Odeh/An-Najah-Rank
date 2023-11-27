from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import update_data, delete_data
from MySQL_SetUp import connection
@app.route('/admin', methods=['GET'])
def get_professor_pending():
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if role =='admin':
            role = 'professor'
            status = 'pending for admin'
            query = "SELECT * FROM user WHERE role = %s AND status = %s;"
            cursor = connection.cursor()
            cursor.execute(query, (role, status))
            results = cursor.fetchall()
            professors = []
            for professor in results:
                response = {
                    'universityNumber': professor[0],
                    'email': professor[1],
                    'name': professor[2],
                }
                professors.append(response)
            return jsonify({'professors': professors}), 200
        return jsonify({'professors': [], 'message': 'you are not admin'}), 401
    except Exception as e:
        return jsonify({'message': e}), 409

@app.route('/admin/<int:id>', methods=['PUT'])
def update_professor_status(id):
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if role == 'admin':
            condition = 'universityNumber = %s'
            new_values = (
                'approved',
                id
            )
            result = update_data(
                connection,
                'user',
                ['status'],
                new_values,
                condition
            )
            return result
        return jsonify({'message': 'you are not admin'}), 401
    except Exception as e:
        return {'message': str(e)}, 500

@app.route('/admin/<int:id>', methods=['DELETE'])
def delete_professor(id):
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if role == 'admin':
            condition = f'universityNumber = {id}'
            result = delete_data(
                connection,
                'user',
                condition,
            )
            return result
        return jsonify({'message': 'you are not admin'}), 401
    except Exception as e:
        return {'message': str(e)}, 500