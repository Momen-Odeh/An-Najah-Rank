from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, update_data, delete_data
from MySQL_SetUp import connection
from Notification.notification import handle_notification
@app.route('/contests', methods=['POST'])
def add_contest():
    try:
        data = request.get_json()
        tokenData = getattr(request, 'tokenData', None)
        ownerUniversityNumber = tokenData['universityNumber']
        result = insert_data(
            connection,
            'contests',
            ['name', 'description', 'startTime', 'hasEndTime', 'endTime', 'OwnerUniversityNumber', 'courseNumber'],
            (data['name'], data['description'], data['startTime'], data['hasEndTime'], data['endTime'],
             ownerUniversityNumber, data['courseNumber'])
        )
        cursor = connection.cursor()
        cursor.execute(f"SELECT name from courses WHERE courseNumber = '{data['courseNumber']}';")
        course_name = cursor.fetchone()[0]
        cursor.execute(f"SELECT studentNumber from student_enrollments WHERE courseNumber = '{data['courseNumber']}';")
        students = [student[0] for student in cursor.fetchall()]

        contest_id, status = get_contests_id(data['name'], data['description'], data['startTime'],
                                             ownerUniversityNumber, data['courseNumber'], data['hasEndTime'])

        if status == 200:
            handle_notification(True, f"New contest added to {course_name} course", students,
                                data['courseNumber'], contest_id)

            return jsonify({'message': contest_id}), 200
        else:
            return jsonify({'message': contest_id}), 409
    except Exception as e:
        print("Error:", e)
        return {'message': str(e)}, 409

def get_contests_id(name, description, startTime, ownerUniversityNumber, courseNumber, hasEndTime):
    try:
        sql_query = """
            SELECT id 
            FROM contests 
            WHERE 
                name = %s 
                AND description = %s 
                AND startTime = %s 
                AND hasEndTime = %s 
                AND OwnerUniversityNumber = %s 
                AND courseNumber = %s
        """
        params = (
            name,
            description,
            startTime,
            hasEndTime,
            ownerUniversityNumber,
            courseNumber
        )
        cursor = connection.cursor()
        cursor.execute(sql_query, params)
        result = cursor.fetchall()
        if result:
            return result[-1][0], 200  # Return the last contest ID and status
        else:
            return None, 404  # Return None if contest ID is not found

    except Exception as e:
        return {'message': str(e)}, 500



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