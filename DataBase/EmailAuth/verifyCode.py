from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query,fetch_results,delete_data,update_data
import datetime
@app.route('/verfiyCode', methods=['POST'])
def verifyCode ():
        try:
            data = request.get_json()
            email = data.get('email')
            expectCode = data.get('code')
            result = fetch_results(execute_query(connection, f"select code,TTL from code_verification where email ='{email}';"))
            if(len(result) != 0 ):
                desiredCode = result[0][0]
                TTL = result[0][1]
                current_datetime = datetime.datetime.now()
                if (desiredCode == expectCode):
                    if (current_datetime < TTL):
                        return jsonify({"msg": f"Valid access"}), 200
                    else:
                        return jsonify({"msg": f"invalid TTL"}), 422
                else:
                    return jsonify({"msg": f"invalid access"}), 422


            return jsonify({"msg": f"Not found email"}), 404
        except Exception as e:
            return jsonify({"error": f"{e}"}), 400

@app.route('/emailCodeVerification', methods=['POST'])
def deleteCode ():
    try:
        val = request.get_json()
        email = val.get('email')
        print(email)
        return delete_data(connection,"code_verification",f"email = '{email}'"),200
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400
@app.route('/userStatusAuth', methods=['PUT'])
def updateUserStatusAuth ():
    try:
        val = request.get_json()
        email = val.get('email')
        res = execute_query(connection, f"select role from user where email = '{email}'")
        if(fetch_results(res)[0][0] == "student"):
            return update_data(connection,'user',['status'],("active"),f"email = '{email}'")
        elif (fetch_results(res)[0][0] == "professor") :
            return update_data(connection, 'user', ['status'], ("pending for adminstrator"), f"email = '{email}'")

    except Exception as e:
        return jsonify({"error": f"{e}"}), 400

