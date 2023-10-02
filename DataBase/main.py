from flask import request, jsonify
from EmailAuth.emailConnection import sendEmail
from FlaskSetUp import app
from APIs.registration import register_user

@app.route('/register', methods=['POST'])
def register():
    return register_user()

@app.route('/sendEmail', methods=['POST'])
def mailAPI():
    if request.is_json:
        try:
            data = request.get_json()
            email = data.get('email')
            title = data.get('title')
            body = "reset password body"
            return sendEmail(email,title,body)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400

if __name__ == "__main__":
    app.run(debug=True)
