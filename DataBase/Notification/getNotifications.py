from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify
@app.route('/get-notifications', methods=['GET'])
def get_notifications():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        params = request.args
        get_all = int(params['all'])
        query = f"""
                        SELECT id, text, sendTime, courseNumber, contestId, challengeId
                        FROM (
                            SELECT n.id, n.text, n.sendTime, n.courseNumber, n.contestId, n.challengeId
                            FROM notifications n
                            JOIN student_enrollments se ON n.courseNumber = se.courseNumber
                            WHERE se.studentNumber = '{user_id}' AND n.userId IS NULL
                            UNION
                            SELECT id, text, sendTime, courseNumber, contestId, challengeId
                            FROM notifications
                            WHERE userId = '{user_id}'
                        ) AS combined_notifications
                        ORDER BY sendTime DESC
                        """
        if get_all==0:
            query += " limit 10"
        cursor = connection.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        notifications = [{"id": notification[0], "title": notification[1],
                          "time": notification[2].strftime('%Y-%m-%d %H:%M:%S'), "courseNumber": notification[3],
                          "contestId": notification[4], "challengeId": notification[5]}
                         for notification in data]

        cursor = connection.cursor()
        cursor.execute(f"""SELECT lastReadNotification from user WHERE universityNumber = '{user_id}' """)
        lastReadNotification = cursor.fetchone()[0]
        return jsonify({"notifications": notifications, "lastReadNotification": lastReadNotification}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500

@app.route('/update-last-notification', methods=['POST'])
def update_last_notification():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        body = request.get_json()
        cursor = connection.cursor()
        cursor.execute(f"""
                            SELECT id from notifications WHERE text = '{body['title']}' 
                            AND sendTime = '{body['time']}'; """)
        notification_id = cursor.fetchone()[0]

        cursor.execute("""
            UPDATE user
            SET lastReadNotification = %s
            WHERE universityNumber = %s;
        """, (notification_id, user_id))
        connection.commit()
        return {'message': "done"}, 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500