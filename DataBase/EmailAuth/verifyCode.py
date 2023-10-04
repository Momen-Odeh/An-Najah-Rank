from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query,fetch_results
import datetime
@app.route('/verfiyCode', methods=['POST'])
def verifyCode ():
    if request.is_json:
        try:
            data = request.get_json()
            email = data.get('email')
            expectCode = data.get('code')
            result = fetch_results(execute_query(connection, f"select code,TTL from code_verification where email ='{email}';"))
            if(len(result) != 0 ):
                desiredCode = result[0][0]
                TTL = result[0][1]
                current_datetime = datetime.datetime.now()
                if(current_datetime < TTL):
                    if(desiredCode == expectCode):
                        return jsonify({"msg": f"Valid access"}), 200
                    else:
                        return jsonify({"msg": f"invalid access"}), 422
                else:
                    return jsonify({"msg": f"invalid TTL"}), 422

            return jsonify({"msg": f"Not found email"}), 404
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400