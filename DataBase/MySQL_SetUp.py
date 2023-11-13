from dataBaseConnection import connect_to_database
host = 'an-najah-rank.c2rjncawk2d7.eu-north-1.rds.amazonaws.com'
user = 'admin'
password = 'AnNajahRank119'
database = 'an-najah rank'
connection = connect_to_database(host, user, password, database)
connection.autocommit = True