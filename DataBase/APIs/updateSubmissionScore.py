from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify
from dataBaseConnection import update_data

@app.route('/update-submission-score/<int:id>', methods=['PUT'])
def update_submission_score(id):
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if role != 'professor':
            return {'message': ""}, 401
        data = request.get_json()
        submissionResult = data.get('submissionResult')
        update_data(connection, "student_submissions", ["submissionResult"], (submissionResult), f"id = '{id}'")
        return jsonify({'message': 'Submission updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500
