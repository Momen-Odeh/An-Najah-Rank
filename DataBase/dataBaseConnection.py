import pymysql

def connect_to_database(host, user, password, database):
    try:
        connection = pymysql.connect(host=host, user=user, password=password, database=database)
        return connection
    except pymysql.Error as e:
        print(f"Error: {e}")
        return None

def execute_query(connection, query):
    try:
        cursor = connection.cursor()
        cursor.execute(query)
        return cursor
    except pymysql.Error as e:
        print(f"Error: {e}")
        return None

def fetch_results(cursor):
    try:
        results = cursor.fetchall()
        return results
    except pymysql.Error as e:
        print(f"Error: {e}")
        return None

def close_connection(connection, cursor):
    try:
        cursor.close()
        connection.close()
    except pymysql.Error as e:
        print(f"Error: {e}")