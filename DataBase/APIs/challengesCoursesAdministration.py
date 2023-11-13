from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query, fetch_results
import json
from authentication import get_Data_from_token

@app.route('/challenges-for-owner', methods=['GET'])
def getChallengesForOwner():
    try:
        tokenData = getattr(request, 'tokenData', None)
        ownerUniversityNumber = tokenData['universityNumber']
        name = tokenData['name']

        challenge_query = f"SELECT * FROM challenges WHERE ownerUniversityNumber = {ownerUniversityNumber};"
        challenges = fetch_results(execute_query(connection, challenge_query))
        challenge_objects = []
        for row in challenges:
            challenge = {
                "id": row[0],
                "name": row[1],
                "ownerName": name,
                "tags": json.loads(row[8])
            }
            challenge_objects.append(challenge)


        course_query = f"SELECT * FROM courses WHERE ownerUniversityNumber = {ownerUniversityNumber};"
        courses = fetch_results(execute_query(connection, course_query))
        course_objects = []
        for row in courses:
            course = {
                "id": row[0],
                "name": row[1],
                "ownerName": name,
                "moderators": fetch_results(execute_query(connection, f"""
                    SELECT u.fullName
                    FROM user AS u
                    INNER JOIN course_moderators AS cm ON u.universityNumber = cm.stuffNumber
                    WHERE cm.courseNumber = {row[0]};
                """))
            }
            course_objects.append(course)

        moderated_courses_query = f"""
            SELECT c.*
            FROM courses AS c
            INNER JOIN course_moderators AS cm ON c.courseNumber = cm.courseNumber
            WHERE cm.stuffNumber = {ownerUniversityNumber};
        """
        moderated_courses = fetch_results(execute_query(connection, moderated_courses_query))
        for row in moderated_courses:
            moderated_course = {
                "id": row[0],
                "name": row[1],
                "ownerName": fetch_results(execute_query(connection, f"SELECT fullName FROM user WHERE universityNumber = {row[3]};")),
                "moderators": fetch_results(execute_query(connection, f"""
                    SELECT u.fullName
                    FROM user AS u
                    INNER JOIN course_moderators AS cm ON u.universityNumber = cm.stuffNumber
                    WHERE cm.courseNumber = {row[0]};
                """))
            }
            course_objects.append(moderated_course)

        return {"challenges": challenge_objects, "courses": course_objects}, 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400
