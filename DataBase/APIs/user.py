from FlaskSetUp import app
from flask import request, jsonify, send_file
from dataBaseConnection import execute_query, fetch_results, update_data, delete_data
from MySQL_SetUp import connection
from fileManagment.uploadFile import upload_file
from fileManagment.getFileAWS import get_file_from_AWS
from fileManagment.deleteFileAWS import delete_file_from_AWS
from werkzeug.security import generate_password_hash, check_password_hash
import io
from UserStatistics.statistics_for_user import statistics_for_user


@app.route('/user', methods=['GET'])
def getUserInfo():
    try:

        # print("---------->",request.args.get('id')) # form /profile None and from /profile/:id id
        tokenData = getattr(request, 'tokenData', None)

        if request.args.get('id') is not None:
            sql = f"SELECT * FROM `an-najah rank`.user where universityNumber = '{request.args.get('id')}';"
            access = int(request.args.get('id')) == int(tokenData['universityNumber']) or \
                     tokenData['role'] == "admin" or tokenData['role'] == "professor"
        else:
            sql = f"SELECT * FROM `an-najah rank`.user where email = '{tokenData['email']}';"
            access=True
        if not access:
            return jsonify({
                "message": "invalid access",
            }), 401
        result = fetch_results(execute_query(connection, sql))


        if len(result) != 0:
            if (result[0][3] == "student"):
                userStatistics = statistics_for_user(result[0][0])
            else:
                userStatistics =None
            response = {
                "status": "ok",
                "universityNumber": result[0][0],
                "email": result[0][1],
                "fullName": result[0][2],
                "role": result[0][3],
                "userStatistics":userStatistics
            }


            if result[0][6] is not None:
                response["img"] = get_file_from_AWS(result[0][6])  # base64.b64encode(result[0][6]).decode('utf-8')

            return jsonify(response), 200
        else:
            return jsonify({
                "status": "not found",
            }), 404
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e),  # Convert the error to a string
        }), 400


@app.route('/userImg', methods=['PUT'])
def UpdateUserImg():
    tokenData = getattr(request, 'tokenData', None)
    try:
        image = request.files['image']
        result = fetch_results(
            execute_query(connection, f"SELECT * FROM user where universityNumber = '{tokenData['universityNumber']}';")
        )
        if result[0][6] is not None or result[0][6] != "":
            delete_file_from_AWS(result[0][6])

        # imageData = image.read()
        # print("imageData")
        key = upload_file(image, f"images/userImages/{tokenData['email']}")
        update_data(connection, 'user', ["img"], (key), f"(email = '{tokenData['email']}')")
        return {
            "status": "Update image successfully",
        }, 200
    except Exception as e:
        return {
            "status": "error",
            "error": e,
        }, 400


@app.route('/user', methods=['PUT'])  # must add token to the API
def UpdateUser():
    try:
        data = request.get_json()
        tokenData = getattr(request, 'tokenData', None)
        print(data['keys'])
        print(len(data['keys']))
        if len(data['keys']) == 2 and data['values'][1] is None:
            result = fetch_results(
                execute_query(connection, f"SELECT * FROM `an-najah rank`.user where email = '{tokenData['email']}';")
            )
            delete_file_from_AWS(result[0][6])
        update_data(connection, 'user', data['keys'], data['values'], f"(email = '{tokenData['email']}')")
        return jsonify({
            "status": "Update image successfully",
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400


@app.route('/user', methods=['DELETE'])  # must remove all info incloude
def DeleteUser():
    try:
        tokenData = getattr(request, 'tokenData', None)
        password = request.args.get('password')
        result = fetch_results(
            execute_query(connection, f"SELECT * FROM `an-najah rank`.user where email = '{tokenData['email']}';"))
        if (check_password_hash(result[0][5], password)):
            return delete_data(connection, 'user', f"email = '{tokenData['email']}'")
        else:
            return jsonify({'message': "Password not correct"}), 422
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400


@app.route('/userImg/<email>', methods=['GET'])  # must add token to the API
def getUserImg(email):
    try:
        result = fetch_results(
            execute_query(connection,
                          f"SELECT img FROM `an-najah rank`.user where email = '{email}';"), )
        if len(result) != 0:
            imgData = result[0][0]
            return send_file(io.BytesIO(imgData), mimetype='image/jpeg'), 200
        else:
            return jsonify({
                "status": f"not found",
            }), 404
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400


@app.route('/updatePasswordSettings', methods=['PUT'])
def updatePasswordSettings():
    if request.is_json:
        try:
            tokenData = getattr(request, 'tokenData', None)
            data = request.get_json()
            email = tokenData['email']
            currentPassword = data['currentPassword']
            newPassword = data['newPassword']
            confirmPassword = data['confirmPassword']
            print(data)
            if (newPassword == confirmPassword):
                result = fetch_results(
                    execute_query(connection,
                                  f"SELECT * FROM `an-najah rank`.user where email = '{email}';")
                )
                if (check_password_hash(result[0][5], currentPassword)):
                    return update_data(connection, 'user', ["password"], generate_password_hash(newPassword),
                                       f"( email = '{email}');")
                else:
                    return jsonify({'message': "current password not correct."}), 422
            else:
                return jsonify({"message": f"miss match passwords"}), 422
        except Exception as e:
            return jsonify({"message": e}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400
