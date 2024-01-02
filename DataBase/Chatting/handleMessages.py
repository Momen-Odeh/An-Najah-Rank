from MySQL_SetUp import connection
from SocketIO import send_notification_to_user
from fileManagment.getFileAWS import get_file_from_AWS


def handle_messages(conversation_id, send_time, message, user_id):
    try:
        query = f"""
                    SELECT 
                        CASE 
                            WHEN user1ID = '{user_id}' THEN user2ID
                            ELSE user1ID
                        END AS corresponding_user_id
                    FROM conversations
                    WHERE conversationID = '{conversation_id}';
                 """
        cursor = connection.cursor()
        cursor.execute(query)
        receiver_id = cursor.fetchone()[0]
        cursor.execute(f"""SELECT fullName, img from user WHERE universityNumber = '{user_id}';""")
        data = cursor.fetchone()[0]
        notification = {
            'conversationId': conversation_id,
            'time': send_time,
            'message': message,
            'senderName': data[0],
            'imgURL': get_file_from_AWS(data[1]) if data[1] else None
        }
        send_notification_to_user(str(receiver_id), notification, 'message')

    except Exception as e:
        print(e)

