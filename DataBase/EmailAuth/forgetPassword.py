from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import update_data,insert_data,execute_query,fetch_results
from  EmailAuth.createVerificationCode import sendForgetEmail

@app.route('/forgetPassword', methods=['POST'])
def forgetPassword():
        try:
            data = request.get_json()
            email = data.get('email')
            print(email)
            result = fetch_results(execute_query(connection, f"select * from user where email ='{email}';"))
            if (len(result) != 0):
                sendForgetEmail(email)
                return jsonify({"msg": "Email ended"}), 200
            else:
                return jsonify({"msg": "Not found Email"}), 404
        except Exception as e:
            return jsonify({"error": f"{e}"}), 400


#