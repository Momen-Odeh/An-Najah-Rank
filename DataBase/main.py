from flask import Flask, request
from dataBaseConnection import connect_to_database
from APIs.registration import register_user
app = Flask(__name__)
host = 'localhost'
user = 'root'
password = 'Noor@2002'
database = 'an-najah rank'
connection = connect_to_database(host, user, password, database)
@app.route('/register', methods=['POST'])
def register():
    request_data = request.json
    return register_user(connection, request_data)


if __name__ == "__main__":
    app.run(debug=True)
