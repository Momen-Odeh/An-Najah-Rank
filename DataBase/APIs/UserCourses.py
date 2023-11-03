from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query,fetch_results
import json
from authentication import get_Data_from_token
import base64

@app.route('/userCourses', methods=['GET'])
def getUserCourses():
    try:
        tokenData = get_Data_from_token(request.args.get('token'))
        sql = f"""
        SELECT
        courses.courseNumber,
        courses.name,
        courses.description,
        courses.ownerUniversityNumber,
        courses.backgroundImage,
        GROUP_CONCAT(DISTINCT user.fullName) AS moderatorFullNames
        FROM student_enrollments
        INNER JOIN courses ON student_enrollments.courseNumber = courses.courseNumber
        INNER JOIN course_moderators ON student_enrollments.courseNumber = course_moderators.courseNumber
        INNER JOIN user ON course_moderators.stuffNumber = user.universityNumber
        WHERE student_enrollments.studentNumber = '{tokenData['universityNumber']}'
        GROUP BY courses.courseNumber, courses.name, courses.description, courses.ownerUniversityNumber, courses.backgroundImage;
        """
        result = fetch_results(execute_query(connection, sql))
        coursesData =[]
        if len(result) != 0:
            for item in result:
                response= {
                "status": "ok",
                "courseNumber": item[0],
                "title": item[1],
                "description": item[2],
                "ownerUniversityNumber": item[3],
                "img": "https://wallpapercrafter.com/desktop/161398-low-poly-digital-art-network-dots-abstract-lines-red-cyan.png",#None,
                "modirators":item[5].split(',')
            }
                if item[4] is not None:
                    response["img"] = "data:image/jpeg;base64,"+base64.b64encode(item[4]).decode('utf-8')
                coursesData.append(response)

            return {"status":"found courses","courses":coursesData}, 200
        else:
            return jsonify({
                "status": "not found",
            }), 404
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e),  # Convert the error to a string
        }), 400