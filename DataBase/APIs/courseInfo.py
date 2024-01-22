from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
from APIs.contestsForCourse import getContestForCourse
from fileManagment.getFileAWS import get_file_from_AWS
from guard.professorAccess.AccessCourseProfessor import accessCourseProfessor
from guard.AccessCourse import accessCourse
@app.route('/course-info', methods=['GET'])
def get_course_info():
    try:
        tokenData = getattr(request, 'tokenData', None)
        if request.args.get('courseView'):
            access = accessCourse(request.args.get('courseNumber'), tokenData['universityNumber'])
        else:
            access = accessCourseProfessor(request.args.get('courseNumber'), tokenData['universityNumber'])
        if not access:
            return jsonify({"message": "Access Denied"}), 401
        query = f"""
                    SELECT *
                    FROM courses 
                    WHERE 
                    courseNumber ={request.args.get('courseNumber')};
                """
        cursor = connection.cursor()
        cursor.execute(query)
        course = cursor.fetchone()
        query = f"""
                            SELECT fullName, email
                            FROM user 
                            WHERE 
                            universityNumber ={course[3]};
                        """
        cursor = connection.cursor()
        cursor.execute(query)
        Owner = cursor.fetchone()
        Owner=(Owner[0],Owner[1],course[3])
        courseData = {
            "courseNumber": course[0],
            "name": course[1],
            "description": course[2],
            "owner": {"universityNumber": course[3], "name": Owner[0], "email": Owner[1]},
            "backgroundImage": None
        }
        if course[4] is not None:
            courseData["backgroundImage"] = get_file_from_AWS(course[4])
        query = f"""
                    SELECT *
                    FROM user 
                    WHERE 
                    role ='professor'
                    AND universityNumber != {course[3]};
                """
        cursor = execute_query(connection, query)
        data = fetch_results(cursor)
        suggestionModerators=[]
        for professor in data:
            suggestionModerators.append({
                "name": professor[2],
                "email": professor[1],
                "universityNumber": professor[0]
            })

        students = []
        if tokenData["role"] == "professor" or tokenData["role"] == "admin":
            query = f"""
                                SELECT u.*
                                FROM user u
                                JOIN student_enrollments se ON u.universityNumber = se.studentNumber
                                WHERE se.courseNumber = {request.args.get('courseNumber')};
                            """
            cursor = execute_query(connection, query)
            data = fetch_results(cursor)
            for student in data:
                students.append({
                    "studentName": student[2],
                    "email": student[1],
                    "registrationNumber": student[0]
                })

            query = f"""
                        SELECT studentNumber
                        FROM student_enrollments se
                        WHERE se.studentNumber NOT IN (SELECT universityNumber FROM user)
                        AND se.courseNumber = {request.args.get('courseNumber')};
                    """
            cursor = execute_query(connection, query)
            data = fetch_results(cursor)
            for student in data:
                students.append({
                    "studentName": 'not registered in system yet',
                    "email": None,
                    "registrationNumber": student[0]
                })

        query = f"""
                    SELECT u.*
                    FROM user u
                    JOIN course_moderators cm ON u.universityNumber = cm.stuffNumber
                    WHERE cm.courseNumber = {request.args.get('courseNumber')};
                """
        cursor = execute_query(connection, query)
        data = fetch_results(cursor)
        sqlStudendCount = f"""
                            SELECT COUNT(DISTINCT studentNumber) as NumStudent FROM student_enrollments
                            WHERE courseNumber = '{request.args.get('courseNumber')}'
                            """
        studendCount = fetch_results(execute_query(connection,sqlStudendCount))[0][0]
        moderators = []
        for professor in data:
            moderators.append({
                "name": professor[2],
                "email": professor[1],
                "universityNumber": professor[0]
            })
        contests = getContestForCourse(request.args.get('courseNumber'),studendCount)

        response_data = {
            'course': courseData,
            'suggestionModerators': suggestionModerators,
            'students': students,
            'moderators': moderators,
            "contests": contests,
            "userRole": tokenData['role']
        }
        return jsonify(response_data), 200

    except Exception as e:
        return {'message': str(e)}, 409