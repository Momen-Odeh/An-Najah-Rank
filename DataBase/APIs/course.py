from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, update_data, delete_data
from MySQL_SetUp import connection
from authentication import get_Data_from_token
@app.route('/courses', methods=['POST'])
def add_course():
    try:
        data = request.get_json()
        tokenData = get_Data_from_token(data['token'])
        ownerUniversityNumber = tokenData['universityNumber']
        result = insert_data(
            connection,
            'courses',
            ['courseNumber', 'name', 'description', 'ownerUniversityNumber', 'backgroundImage'],
            (data['courseNumber'], data['name'], data['description'], ownerUniversityNumber, None)
        )
        if(result[1]==201):
            for university_number in data['studentsUniversityNumber']:
                result = insert_data(
                    connection,
                    'student_enrollments',
                    ['courseNumber', 'studentNumber'],
                    (data['courseNumber'], university_number)
                )
        return result
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/courseImg/<courseNumber>', methods=['PUT'])
def UpdateCorseImg(courseNumber):
    try:
        if 'image' not in request.files:
            return "No image provided", 400
        image = request.files['image']
        if image.filename == '':
            return "No selected file", 400
        imageData = image.read()
        update_data(connection, 'courses', ["backgroundImage"], (imageData), f"(courseNumber = '{courseNumber}')")
        return jsonify({
            "status": "Update image successfully",
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400

@app.route('/courses/<int:id>', methods=['PUT'])
def update_course(id):
    try:
        data = request.get_json()
        condition = 'courseNumber = %s'
        new_values = (
            data['name'],
            data['description'],
            id
        )
        print(new_values)
        result = update_data(
            connection,
            'courses',
            ['name', 'description'],
            new_values,
            condition
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500

@app.route('/courses/<int:id>', methods=['DELETE'])
def delete_course(id):
    try:
        condition = f'courseNumber = {id}'
        result = delete_data(
            connection,
            'courses',
            condition,
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500