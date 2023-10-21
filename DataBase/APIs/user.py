from FlaskSetUp import app
from flask import request, jsonify, send_file
from authentication import get_Data_from_token
from dataBaseConnection import execute_query, fetch_results, update_data, delete_data
from MySQL_SetUp import connection
import json
from werkzeug.security import generate_password_hash,check_password_hash
import io
import base64
@app.route('/user', methods=['GET'])
def getUserInfo():
    try:
        tokenData = get_Data_from_token(request.args.get('token'))
        result = fetch_results(
            execute_query(connection, f"SELECT * FROM `an-najah rank`.user where email = '{tokenData['email']}';")
        )

        if len(result) != 0:
            response = {
                "status": "ok",
                "universityNumber": result[0][0],
                "email": result[0][1],
                "fullName": result[0][2],
                "role": result[0][3],
            }

            if result[0][6] is not None:
                response["img"] = base64.b64encode(result[0][6]).decode('utf-8')

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
@app.route('/userImg', methods=['PUT']) #must add token to the API
def UpdateUserImg():
    tokenData = get_Data_from_token(request.args.get('token'))
    try:
        image = request.files['image']
        imageData = image.read()
        print("imageData")
        update_data(connection, 'user', ["img"], (imageData), f"(email = '{tokenData['email']}')")
        return jsonify({
            "status": "Update image successfully",
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400

@app.route('/user', methods=['PUT']) #must add token to the API
def UpdateUser():
    try:
        data = request.get_json()
        tokenData = get_Data_from_token(request.args.get('token'))
        print(data['keys'])
        print(data['values'])
        update_data(connection, 'user', data['keys'], data['values'], f"(email = '{tokenData['email']}')")
        return jsonify({
            "status": "Update image successfully",
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400

@app.route('/user', methods=['DELETE']) #must add token to the API
def DeleteUser():
    try:
        tokenData = get_Data_from_token(request.args.get('token'))
        password = request.args.get('password')
        result = fetch_results(execute_query(connection,f"SELECT * FROM `an-najah rank`.user where email = '{tokenData['email']}';"))
        if (check_password_hash(result[0][5], password)):
            return delete_data(connection, 'user', f"email = '{tokenData['email']}'")
        else:
            return jsonify({'message': "Password not correct"}), 422
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400

@app.route('/userImg/<email>', methods=['GET']) #must add token to the API
def getUserImg(email):
    try:
        result = fetch_results(
            execute_query(connection,
                          f"SELECT img FROM `an-najah rank`.user where email = '{email}';"), )
        if len(result) != 0:
            imgData = result[0][0]
            return send_file(io.BytesIO(imgData), mimetype='image/jpeg'),200
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
            tokenData = get_Data_from_token(request.args.get('token'))
            data = request.get_json()
            email = tokenData['email']
            currentPassword = data['currentPassword']
            newPassword = data['newPassword']
            confirmPassword = data['confirmPassword']
            print(data)
            if(newPassword == confirmPassword):
                result = fetch_results(
                    execute_query(connection,
                                  f"SELECT * FROM `an-najah rank`.user where email = '{email}';")
                )
                if(check_password_hash(result[0][5],currentPassword)):
                    return update_data(connection, 'user', ["password"], (generate_password_hash(newPassword)), f"( email = '{email}');")
                else:
                    return jsonify({'message':"current password not correct."}),422
            else:
                return jsonify({"message": f"miss match passwords"}), 422
        except Exception as e:
            return jsonify({"message": e}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400