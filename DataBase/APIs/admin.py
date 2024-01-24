from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import update_data, delete_data
from MySQL_SetUp import connection
@app.route('/admin', methods=['GET'])
def get_professor_pending():
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        finalResult ={}
        if role =='admin':
            role = 'professor'
            status = 'pending for admin'
            query = "SELECT * FROM user WHERE role = %s AND status = %s;"
            cursor = connection.cursor()
            cursor.execute(query, (role, status))
            results = cursor.fetchall()
            professors = []
            for professor in results:
                response = {
                    'universityNumber': professor[0],
                    'email': professor[1],
                    'name': professor[2],
                }
                professors.append(response)
            finalResult["pendingProfessors"] = professors
            # *********************************************************************************************************
            role = 'professor'
            status = 'approved'
            query = "SELECT * FROM user WHERE role = %s AND status = %s;"
            cursor = connection.cursor()
            cursor.execute(query, (role, status))
            results = cursor.fetchall()
            professors = []
            for professor in results:
                response = {
                    'universityNumber': professor[0],
                    'email': professor[1],
                    'name': professor[2],
                }
                professors.append(response)
            finalResult["activeProfessors"] = professors
            # *********************************************************************************************************
            role = 'student'
            status = 'approved'
            query = "SELECT * FROM user WHERE role = %s;"
            cursor = connection.cursor()
            cursor.execute(query, (role))
            results = cursor.fetchall()
            students = []
            for student in results:
                response = {
                    'universityNumber': student[0],
                    'email': student[1],
                    'name': student[2],
                }
                students.append(response)
            finalResult["activeStudents"] = students
            # *********************************************************************************************************
            query = """
                select u.universityNumber,u.fullName,u.role,
                count(cc.challenge_id) as totalSubmission,
                (select  count(DISTINCT ss.courseNumber, ss.contestId, ss.challengeId)
                from student_submissions ss
                inner join challenges ccc on  ccc.id = ss.challengeId
                where ss.studentUniversityNumber = se.studentNumber and ss.submissionResult = '100')as successSubmission
                from student_enrollments se
                inner join contests c on se.courseNumber = c.courseNumber
                inner join contests_challenges cc on c.id = cc.contest_id
                inner join user u on u.universityNumber = se.studentNumber
                where u.role = 'student'
                group by se.studentNumber
                order by successSubmission DESC
                limit 100
                """
            cursor = connection.cursor()
            cursor.execute(query)
            results = cursor.fetchall()
            submissions = []
            for submission in results:
                response = {
                    'universityNumber': submission[0],
                    'name': submission[1],
                    'totalSubmission': submission[3],
                    'successSubmission': submission[4],
                }
                submissions.append(response)
            finalResult["topStudents"] = submissions
            # *********************************************************************************************************
            return jsonify(finalResult), 200
        return jsonify({'professors': [], 'message': 'you are not admin'}), 401
    except Exception as e:
        return jsonify({'message': e}), 409

@app.route('/admin/<int:id>', methods=['PUT'])
def update_professor_status(id):
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if role == 'admin':
            condition = 'universityNumber = %s'
            new_values = (
                'approved',
                id
            )
            result = update_data(
                connection,
                'user',
                ['status'],
                new_values,
                condition
            )
            return result
        return jsonify({'message': 'you are not admin'}), 401
    except Exception as e:
        return {'message': str(e)}, 500

@app.route('/admin/<int:id>', methods=['DELETE'])
def delete_professor(id):
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if role == 'admin':
            condition = f'universityNumber = {id}'
            result = delete_data(
                connection,
                'user',
                condition,
            )
            return result
        return jsonify({'message': 'you are not admin'}), 401
    except Exception as e:
        return {'message': str(e)}, 500
