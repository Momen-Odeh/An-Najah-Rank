from FlaskSetUp import app
from flask import request,jsonify
from fileManagment.deleteFileAWS import delete_file_from_AWS

from MySQL_SetUp import connection
from guard.professorAccess.AccessCourseProfessor import accessCourseProfessor

@app.route('/course_data', methods=['DELETE'])
def delete_courses():
    try:
        tokenData = getattr(request, 'tokenData', None)
        ownerUniversityNumber = tokenData['universityNumber']
        courseId = request.args.get('courseId')
        access = accessCourseProfessor(courseId, ownerUniversityNumber)
        if not access:
            return jsonify({"message": "Access Denied"}), 401
        #delete files from contests_challenges
        cursor = connection.cursor()
        query = f"""
                SELECT cc.similarityFileKey FROM courses c
                INNER JOIN contests co ON c.courseNumber = co.courseNumber
                INNER JOIN contests_challenges cc on cc.contest_id = co.id
                where c.courseNumber = '{courseId}' and cc.similarityFileKey != 'null'
                """
        cursor.execute(query)
        connection.commit()
        for res in cursor.fetchall():
            delete_file_from_AWS(res[0])
        #delete files from student_submissions
        cursor = connection.cursor()
        query = f"""
                SELECT ss.submissionFileKey FROM courses c
                INNER JOIN contests co ON c.courseNumber = co.courseNumber
                INNER JOIN student_submissions ss on ss.courseNumber = co.courseNumber
                where c.courseNumber = '{courseId}' and ss.submissionFileKey != 'null'
                """
        cursor.execute(query)
        connection.commit()
        for res in cursor.fetchall():
            delete_file_from_AWS(res[0])

        #delete background image
        cursor = connection.cursor()
        query = f"""
                        SELECT * FROM `an-najah rank`.courses where courseNumber = '{courseId}';
                        """
        cursor.execute(query)
        connection.commit()
        bg_img = cursor.fetchone()[4]

        if bg_img is not None:
            delete_file_from_AWS(bg_img)
        #delete form contest table
        cursor = connection.cursor()
        query = f"DELETE FROM courses WHERE courseNumber = '{courseId}'; "
        cursor.execute(query)
        connection.commit()

        return jsonify({'message': "contest deleted successfully."}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 409