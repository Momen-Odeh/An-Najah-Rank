from FlaskSetUp import app
from flask import request
from dataBaseConnection import insert_data, delete_data
from MySQL_SetUp import connection
from Notification.notification import handle_notification

@app.route('/course_moderators', methods=['POST'])
def add_course_moderators():
    try:
        data = request.get_json()
        result = insert_data(
            connection,
            'course_moderators',
            ['courseNumber', 'stuffNumber'],
            (data['courseNumber'], data['stuffNumber'])
        )
        cursor = connection.cursor()
        cursor.execute(f"""
                                    SELECT name from courses
                                    WHERE  courseNumber = '{data['courseNumber']}'
                                """)
        course_name = cursor.fetchone()[0]
        handle_notification(False, f"Your added as moderator in {course_name} course", [data['stuffNumber']],
                            data['courseNumber'])
        return result
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/course_moderators', methods=['DELETE'])
def delete_course_moderators():
    try:
        course_number = request.args.get('courseNumber')
        stuff_number = request.args.get('stuffNumber')
        condition = f'courseNumber = {course_number} AND stuffNumber = {stuff_number}'
        result = delete_data(
            connection,
            'course_moderators',
            condition,
        )
        cursor = connection.cursor()
        cursor.execute(f"""
                           SELECT name from courses
                           WHERE  courseNumber = '{course_number}'
                       """)
        course_name = cursor.fetchone()[0]
        handle_notification(False, f"Your moderator access in {course_name} course removed", [stuff_number])
        return result
    except Exception as e:
        return {'message': str(e)}, 500