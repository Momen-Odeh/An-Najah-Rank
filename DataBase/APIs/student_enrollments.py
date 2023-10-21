from FlaskSetUp import app
from flask import request
from dataBaseConnection import insert_data, delete_data
from MySQL_SetUp import connection
@app.route('/student_enrollments', methods=['POST'])
def add_student_enrollments():
    try:
        data = request.get_json()
        result = insert_data(
            connection,
            'student_enrollments',
            ['courseNumber', 'studentNumber'],
            (data['courseNumber'], data['studentNumber'])
        )
        if(result[1]==201):
            query = f"""
                        SELECT universityNumber, fullName, email
                        FROM user
                        WHERE
                        universityNumber = {data['studentNumber']}
                    """
            cursor = connection.cursor()
            cursor.execute(query)
            result = cursor.fetchone()
            if result:
                result = {
                    "registrationNumber": result[0],
                    "studentName": result[1],
                    "email": result[2]
                }
            else:
                result = {
                    "registrationNumber": data['studentNumber'],
                    "studentName": 'not registered in system yet',
                    "email": ''
                }
        return result
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/student_enrollments', methods=['DELETE'])
def delete_student_enrollments():
    try:
        course_number = request.args.get('courseNumber')
        student_number = request.args.get('studentNumber')
        condition = f'courseNumber = {course_number} AND studentNumber = {student_number}'
        result = delete_data(
            connection,
            'student_enrollments',
            condition,
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500