from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query, fetch_results

def getContestForCourse(id):
    try:
        challenge_query = f"SELECT * FROM contests WHERE courseNumber = {id};"
        challenges = fetch_results(execute_query(connection, challenge_query))
        challenge_objects = []
        cursor = connection.cursor()
        for row in challenges:
            cursor.execute(f"SELECT fullName FROM user WHERE universityNumber = {row[6]}")
            challenge = {
                "id": row[0],
                "name": row[1],
                "startDate": row[3],
                "endDate": row[5],
                "ownerName": cursor.fetchone()
            }
            challenge_objects.append(challenge)

        return challenge_objects
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
        }
