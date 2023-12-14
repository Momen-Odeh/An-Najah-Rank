from FlaskSetUp import app
from flask import request, jsonify
from fileManagment.getFileAWS import get_file_from_AWS
from MySQL_SetUp import connection

@app.route('/get-user-info', methods=['GET'])
def get_user_info():
    try:
        tokenData = getattr(request, 'tokenData', None)
        universityNumber = tokenData['universityNumber']
        cursor = connection.cursor()
        cursor.execute(f"SELECT img FROM user WHERE universityNumber = '{universityNumber}';")
        image = cursor.fetchone()[0]
        image = get_file_from_AWS(image) if image else None
        return jsonify({"user": {"universityNumber": tokenData['universityNumber'],
                         "email": tokenData['email'],
                         "name": tokenData['name'],
                         "role": tokenData['role'],
                         "image": image}}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 409
