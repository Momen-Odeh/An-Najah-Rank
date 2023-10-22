from werkzeug.security import generate_password_hash
from flask import jsonify, request
from dataBaseConnection import insert_data
from MySQL_SetUp import connection
from EmailAuth.createVerificationCode import createVerificationCode
from FlaskSetUp import app

@app.route('/register', methods=['POST'])
def register_user():
    request_data = request.json
    email = request_data.get('email')
    fullName = request_data.get('fullName')
    universityNumber = request_data.get('universityNumber')
    password = request_data.get('password')
    role = request_data.get('role')
    try:
        hashed_password = generate_password_hash(password)
        result= insert_data(connection,'user', ['universityNumber','email','fullName','role','status','password'],
                    (universityNumber,email,fullName,role,'pending',hashed_password))
        if(result[1] == 201):
            createVerificationCode(email)
        return result
    except Exception as e:
        print(f"Error while registering user: {e}")
        return jsonify({'error': 'An error occurred saving the user to the database'}), 500
