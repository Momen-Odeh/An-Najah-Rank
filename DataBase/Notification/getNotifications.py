from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify
@app.route('/get-notifications', methods=['GET'])
def get_notifications():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        query = f"""
                        SELECT text, sendTime, courseNumber
                        FROM (
                            SELECT n.text, n.sendTime, n.courseNumber
                            FROM notifications n
                            JOIN student_enrollments se ON n.courseNumber = se.courseNumber
                            WHERE se.studentNumber = '{user_id}'
                            UNION
                            SELECT text, sendTime, courseNumber
                            FROM notifications
                            WHERE userId = '{user_id}'
                        ) AS combined_notifications
                        ORDER BY sendTime DESC
                        """
        cursor = connection.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        notifications = [{"title": notification[0], "time": notification[1].strftime('%Y-%m-%d %H:%M:%S'), "courseNumber": notification[2]} for notification in data]
        return jsonify({"notifications": notifications}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500