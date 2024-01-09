from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import update_data,insert_data,execute_query,fetch_results
from  EmailAuth.createVerificationCode import genrateRandomCode
from  EmailAuth.emailConnection import sendEmail

import datetime
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

def sendForgetEmail(email):
    code = genrateRandomCode()
    TTL = datetime.datetime.now() + datetime.timedelta(minutes=20)
#
    try:
        result = insert_data(connection,'code_verification', ['email','code','TTL'],(email,code,TTL))
        print(result[1])
        if (result[1] == 409):
            print("Update")
            update_data(connection, 'code_verification', ['code', 'TTL'], (code, TTL),f"(`email` = '{email}')")

        msg = """
        Hello,<br>
        We just need to verify your email address before you can Reset An Najah Rank Password.<br>
        Reset your password by entering this code:<br>
        <b>{}</b><br>
        Thanks!<br>
        An Najah Rank team<br>
        """.format(code)

        return(sendEmail(email,"An Najah Rank Reset Password Code",msg))

    except Exception as e:
        print(f"Error while registering user: {e}")
#