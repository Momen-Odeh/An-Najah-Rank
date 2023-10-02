from flask import Flask
from dataBaseConnection import connect_to_database
from dataBaseConnection import execute_query
from dataBaseConnection import fetch_results
from dataBaseConnection import close_connection
app = Flask(__name__)
host = 'localhost'
user = 'root'
password = 'Noor@2002'
database = 'an-najah rank'
connection = connect_to_database(host, user, password, database)
query = 'SELECT * FROM user'
cursor = execute_query(connection, query)
results = fetch_results(cursor)
close_connection(cursor,connection)
for user in results:
    print(user)
if __name__ == "__main__":
    app.run(debug=True)
