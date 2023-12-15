from flask import request, jsonify
from FlaskSetUp import app
from MySQL_SetUp import connection
from dataBaseConnection import execute_query,fetch_results
from fileManagment.getFileAWS import get_file_from_AWS
import json
from authentication import get_Data_from_token
import base64

@app.route('/userCourses', methods=['GET'])
def getUserCourses():
    try:
        tokenData = getattr(request, 'tokenData', None)

        if request.args.get('limit') is not None:
            limitVal = "limit " + request.args.get('limit')
        else:
            limitVal = "limit 1000"

        if request.args.get('id') is not None:
            userid = request.args.get('id')
        else:
            userid = tokenData['universityNumber']

        if tokenData['role'] == 'admin' and request.args.get('id') is None:
            sql = f"""
                    SELECT 
                    c.courseNumber,
                    c.name,
                    c.description,
                    c.ownerUniversityNumber,
                    c.backgroundImage,
                    GROUP_CONCAT(DISTINCT u.fullName) AS moderatorFullNames
                    FROM courses c
                    LEFT join course_moderators  cm ON c.courseNumber = cm.courseNumber
                    LEFT join user u on u.universityNumber = cm.stuffNumber
                    GROUP BY c.courseNumber, c.name, c.description, c.ownerUniversityNumber, c.backgroundImage
                    {limitVal};
                    """
        elif tokenData['role'] == 'professor' and request.args.get('id') is None:
            sql = f"""
                    SELECT  c.courseNumber,
                    c.name,
                    c.description,
                    c.ownerUniversityNumber,
                    c.backgroundImage,
                    GROUP_CONCAT(DISTINCT u.fullName) AS moderatorFullNames
                    FROM courses c
                    LEFT join course_moderators  cm ON c.courseNumber = cm.courseNumber
                    LEFT join user u on u.universityNumber = cm.stuffNumber
                    WHERE cm.stuffNumber = '{userid}' or c.ownerUniversityNumber='{userid}'
                    GROUP BY c.courseNumber, c.name, c.description, c.ownerUniversityNumber, c.backgroundImage
                    {limitVal};
                    """
        else:
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
                    LEFT JOIN course_moderators ON student_enrollments.courseNumber = course_moderators.courseNumber
                    LEFT JOIN user ON course_moderators.stuffNumber = user.universityNumber
                    WHERE student_enrollments.studentNumber = '{userid}'
                    GROUP BY courses.courseNumber, courses.name, courses.description, courses.ownerUniversityNumber, courses.backgroundImage
                    {limitVal};
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
                "modirators": item[5].split(',') if item[5] is not None else None
            }
                if item[4] is not None:
                    response["img"] = get_file_from_AWS(item[4])
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