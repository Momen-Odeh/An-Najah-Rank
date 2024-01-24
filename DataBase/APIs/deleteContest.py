from FlaskSetUp import app
from flask import request,jsonify
from fileManagment.deleteFileAWS import delete_file_from_AWS

from MySQL_SetUp import connection
from guard.professorAccess.AccessContestProfessor import accessContestProfessor

@app.route('/contest', methods=['DELETE'])
def delete_contests():
    try:
        tokenData = getattr(request, 'tokenData', None)
        ownerUniversityNumber = tokenData['universityNumber']
        courseId = request.args.get('courseId')
        contestsId = request.args.get('contestsId')
        print("Contest id is: ",contestsId)
        access = accessContestProfessor(courseId, contestsId, ownerUniversityNumber)
        if not access:
            return jsonify({"message": "Access Denied"}), 401
        #delete files from contests_challenges
        cursor = connection.cursor()
        query = f"""SELECT * FROM `an-najah rank`.contests_challenges where contest_id='{contestsId}'
                    and similarityFileKey != 'null';"""
        cursor.execute(query)
        connection.commit()
        for res in cursor.fetchall():
            delete_file_from_AWS(res[3])
        #delete files from student_submissions
        cursor = connection.cursor()
        query = f"""
                    SELECT * FROM `an-najah rank`.student_submissions where contestId='{contestsId}' and
                     submissionFileKey != 'null';
"""
        cursor.execute(query)
        connection.commit()
        for res in cursor.fetchall():
            delete_file_from_AWS(res[4])
        #delete form contest table
        cursor = connection.cursor()
        query = f"DELETE FROM contests WHERE id = '{contestsId}'; "
        cursor.execute(query)
        connection.commit()

        return jsonify({'message': "contest deleted successfully."}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 409