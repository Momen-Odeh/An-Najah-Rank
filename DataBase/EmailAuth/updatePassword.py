from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import update_data
from werkzeug.security import generate_password_hash
@app.route('/updatePassword', methods=['PUT'])
def updatePassword():
    if request.is_json:
        try:
            data = request.get_json()
            email = data.get('email')
            newPassword = data.get('newPassword')
            confirmPassword = data.get('confirmPassword')
            if(newPassword == confirmPassword):
                update_data(connection, 'user', ["password"], (generate_password_hash(newPassword)), f"(email = '{email}')")
                return jsonify({"msg": f"update sucessfully"}), 200
            else:
                return jsonify({"msg": f"miss match passwords"}), 422
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400