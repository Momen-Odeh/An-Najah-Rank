from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, update_data, delete_data
from MySQL_SetUp import connection
from Notification.notification import handle_notification
@app.route('/contests-challenges', methods=['POST'])
def add_challenge_in_contest():
    try:
        data = request.get_json()
        result = insert_data(
            connection,
            'contests_challenges',
            ['challenge_id', 'contest_id', 'max_score'],
            (data['challenge_id'], data['contest_id'], data['max_score'])
        )
        cursor = connection.cursor()
        cursor.execute(f"""
                        SELECT c.courseNumber, c.name
                        FROM courses c
                        JOIN contests ct ON c.courseNumber = ct.courseNumber
                        WHERE ct.id = '{data['contest_id']}'
                        """)
        course = cursor.fetchone()
        cursor.execute(f"SELECT studentNumber from student_enrollments WHERE courseNumber = '{course[0]}';")
        students = cursor.fetchall()
        students = [student[0] for student in students]
        handle_notification(f"new challenge added to assignment in {course[1]} course", students,
                            course[0])
        return result
    except Exception as e:
        return {'message': str(e)}, 409


@app.route('/contests-challenges', methods=['PUT'])
def update_challenge_in_contest():
    try:
        data = request.get_json()
        condition = f'contest_id = {data["contest_id"]} AND challenge_id = {data["old_challenge_id"]}'
        new_values = (
            data['challenge_id'],
            data['max_score']
        )
        result = update_data(
            connection,
            'contests_challenges',
            ['challenge_id', 'max_score'],
            new_values,
            condition
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500

@app.route('/contests-challenges', methods=['DELETE'])
def delete_challenge_in_contest():
    try:
        condition = f'contest_id = {request.args.get("contest_id")} AND challenge_id = {request.args.get("challenge_id")}'
        result = delete_data(
            connection,
            'contests_challenges',
            condition,
        )
        return result
    except Exception as e:
        return {'message': str(e)}, 500