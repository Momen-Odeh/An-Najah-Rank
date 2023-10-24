from FlaskSetUp import app
from flask import request, jsonify, send_file
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
import base64
import io
@app.route('/course-info', methods=['GET'])
def get_course_info():
    try:

        query = f"""
                    SELECT *
                    FROM courses 
                    WHERE 
                    courseNumber ={request.args.get('courseNumber')}
                """
        cursor = connection.cursor()
        cursor.execute(query)
        course = cursor.fetchone()
        query = f"""
                            SELECT fullName, email
                            FROM user 
                            WHERE 
                            universityNumber ={course[3]}
                        """
        cursor = connection.cursor()
        cursor.execute(query)
        Owner = cursor.fetchone()
        courseData = {
            "courseNumber": course[0],
            "name": course[1],
            "description": course[2],
            "owner": {"universityNumber": course[3], "name": Owner[0], "email": Owner[1]},
            "backgroundImage": None
        }
        if course[4] is not None:
            courseData["backgroundImage"] = base64.b64encode(course[4]).decode('utf-8')
        query = f"""
                    SELECT *
                    FROM user 
                    WHERE 
                    role ='professor'
                    AND universityNumber != {course[3]}
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

        query = f"""
                    SELECT u.*
                    FROM user u
                    JOIN student_enrollments se ON u.universityNumber = se.studentNumber
                    WHERE se.courseNumber = {request.args.get('courseNumber')}
                """
        cursor = execute_query(connection, query)
        data = fetch_results(cursor)
        students = []
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
                    WHERE cm.courseNumber = {request.args.get('courseNumber')}
                """
        cursor = execute_query(connection, query)
        data = fetch_results(cursor)
        moderators = []
        for professor in data:
            moderators.append({
                "name": professor[2],
                "email": professor[1],
                "universityNumber": professor[0]
            })
        query = f"""
                            SELECT id,name,hasEndTime,endTime
                            FROM contests 
                            WHERE 
                            courseNumber ={request.args.get('courseNumber')}
                        """
        cursor = execute_query(connection, query)
        contests = fetch_results(cursor)
        contestsData = []
        for tmp in contests:
            contestsData.append({
                "id": tmp[0],
                "Name": tmp[1],
                "hasEndDate": tmp[2],
                "endDate":tmp[3],
                'solved':True,
                "statistics":[
                    {'key':'Solved Rate: ',"val":"50%"},
                    {'key':'My Score: ',"val":100}
                ]
            })
        response_data = {
            'course': courseData,
            'suggestionModerators': suggestionModerators,
            'students': students,
            'moderators': moderators,
            'contests':contestsData
        }
        return jsonify(response_data), 200
    except Exception as e:
        return {'message': str(e)}, 409