from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, update_data, delete_data, execute_query, fetch_results
from MySQL_SetUp import connection
from fileManagment.uploadFile import upload_file
from fileManagment.deleteFileAWS import delete_file_from_AWS
@app.route('/courses', methods=['POST'])
def add_course():
    try:
        tokenData = getattr(request, 'tokenData', None)
        data = request.get_json()
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
        # imageData = image.read()
        result = fetch_results(
            execute_query(connection,
                          f"SELECT * FROM `an-najah rank`.courses where courseNumber = '{courseNumber}';")
        )
        if result[0][4] is not None or result[0][4] != "":
            delete_file_from_AWS(result[0][4])

        # imageData = image.read()
        # print("imageData")
        key = upload_file(image, f"images/courseImages/{courseNumber}")
        update_data(connection, 'courses', ["backgroundImage"], (key), f"(courseNumber = '{courseNumber}')")
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