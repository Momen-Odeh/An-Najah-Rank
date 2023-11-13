from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
@app.route('/accessCourse', methods=['GET'])
def accessCourse():
    AccessId = getattr(request, 'tokenData', None)['universityNumber']
    # print(getattr(request, 'tokenData', None))
    query = f"""
                        SELECT stuffNumber as registerNumber FROM `an-najah rank`.course_moderators WHERE courseNumber={request.args.get('courseNumber')}
                        UNION
                        SELECT ownerUniversityNumber as registerNumber FROM `an-najah rank`.courses WHERE courseNumber={request.args.get('courseNumber')}
                        UNION
                        SELECT studentNumber as registerNumber FROM `an-najah rank`.student_enrollments WHERE courseNumber={request.args.get('courseNumber')};
                    """
    cursor = connection.cursor()
    cursor.execute(query)
    users = cursor.fetchall()
    valid =False
    for user in users:
        if user[0] == AccessId:
            valid=True
            break
    if valid:
        return jsonify({"Valid":True}),200
    else:
        return jsonify({"Valid":False}),401
