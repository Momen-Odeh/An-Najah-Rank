import pymysql
from flask import jsonify

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

def insert_data(connection, table_name, column_names, values):
    try:
        cursor = connection.cursor()
        placeholders = ', '.join(['%s'] * len(column_names))
        query = f"INSERT INTO {table_name} ({', '.join(column_names)}) VALUES ({placeholders})"
        print(query, values)
        cursor.execute(query, values)
        connection.commit()
        return jsonify({'message': 'data inserted successfully'}), 201
    except pymysql.Error as e:
        print(f"Error: {e}")
        return jsonify({'message': f"Error: {e}" }), 409

def update_data(connection, table_name, column_names, new_values, condition):
    try:
        cursor = connection.cursor()
        query = f"UPDATE {table_name} SET {', '.join([f'{col} = %s' for col in column_names])} WHERE {condition}"
        cursor.execute(query, new_values)
        connection.commit()
        return jsonify({'message':"Data updated successfully."}),200
    except pymysql.Error as e:
        return jsonify({'message': f"Error: {e}" }), 409


def delete_data(connection, table_name, condition):
    try:
        cursor = connection.cursor()
        query = f"DELETE FROM {table_name} WHERE {condition}"
        cursor.execute(query)
        connection.commit()
        return jsonify({'message':"Data deleted successfully."}),200
    except pymysql.Error as e:
        return jsonify({'message': f"Error: {e}" }), 409

def close_connection(connection, cursor):
    try:
        cursor.close()
        connection.close()
    except pymysql.Error as e:
        return jsonify({'message': f"Error: {e}" }), 409
