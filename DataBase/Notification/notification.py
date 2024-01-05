from FlaskSetUp import get_palestine_date_time
from dataBaseConnection import insert_data
from MySQL_SetUp import connection
from SocketIO import send_notification_to_user


def handle_notification(grouped, text, user_ids, course_number=None, contest_id=None, challenge_id=None):
    try:
        send_time = get_palestine_date_time()
        notification = {
            'title': text,
            'time': send_time,
            'courseNumber': course_number,
            'contestId': contest_id,
            'challengeId': challenge_id
        }
        for user_id in user_ids:
            send_notification_to_user(str(user_id), notification, 'notification')
        if grouped:
            values = (text, send_time, course_number, contest_id, challenge_id)
            insert_data(connection, "notifications", ("text", "sendTime", "courseNumber", "contestId", "challengeId"),
                        values)

        else:
            for user_id in user_ids:
                insert_data(connection, "notifications",
                            ("text", "sendTime", "userId", "courseNumber", "contestId", "challengeId"),
                            (text, send_time, user_id, course_number, contest_id, challenge_id))
    except Exception as e:
        print(e)
        
