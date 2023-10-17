from dataBaseConnection import connect_to_database
host = 'localhost'
user = 'root'
password = 'Momen@119'
database = 'an-najah rank'
connection = connect_to_database(host, user, password, database)
connection.autocommit = True
