from werkzeug.security import check_password_hash
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
from flask import request, jsonify
from authentication import generate_token
from FlaskSetUp import app

@app.route('/login',methods=['POST'])
def login_user():
    try:
        request_data = request.json
        email = request_data.get('email')
        password = request_data.get('password')
        check_email_query = f"SELECT * FROM user WHERE email = '{email}'"
        result = execute_query(connection, check_email_query)
        if result:
            user_data = fetch_results(result)
            if user_data:
                stored_password_hash = user_data[0][5]
                if check_password_hash(stored_password_hash, password):
                    if user_data[0][4] == "approved":
                        token = generate_token(user_data[0][1], user_data[0][0], user_data[0][2], user_data[0][3])
                        return jsonify({'message': "Login successful", "token": token}), 200
                    else:
                        if user_data[0][3] == "student":
                            return jsonify({'message': "your account not verified"}), 401
                        elif user_data[0][3] == "professor":
                            return jsonify({'message': "Your request is pending approval by the admin"}), 401
                else:
                    return jsonify({'message': "Incorrect password"}), 401
            else:
                return jsonify({'message': "User not found"}), 404
        else:
            return jsonify({'message': "Database error"}), 500

    except Exception as e:
        return {'message': str(e)}, 409