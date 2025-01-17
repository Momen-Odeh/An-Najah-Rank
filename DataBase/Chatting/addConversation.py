from FlaskSetUp import app, get_palestine_date_time
from MySQL_SetUp import connection
from flask import request
from dataBaseConnection import insert_data
from Chatting.handleMessages import handle_messages
from fileManagment.getFileAWS import get_file_from_AWS


@app.route('/add-conversation', methods=['POST'])
def add_conversation():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        body = request.get_json()
        cursor = connection.cursor()
        cursor.execute(f"""SELECT universityNumber from user WHERE email = '{body['receiverEmail']}'; """)
        receiver_id = cursor.fetchone()
        if not receiver_id:
            return {"message": "receiver not found"}, 404
        receiver_id = receiver_id[0]
        cursor.execute(f"""
            SELECT conversationID
            FROM conversations
            WHERE (user1ID = '{user_id}' AND user2ID = '{receiver_id}')
               OR (user1ID = '{receiver_id}' AND user2ID = '{user_id}');
        """)
        existing_conversation = cursor.fetchone()

        if existing_conversation:
            time = get_palestine_date_time()
            insert_data(connection, "messages", ('conversationID', 'senderID', 'content', 'sendingTime'),
                        [existing_conversation[0], user_id, body['messageContent'], time])
            handle_messages(existing_conversation[0], time, body['messageContent'], receiver_id)
            return {"message": "Conversation already exists", "conversationID": existing_conversation[0]}, 200

        insert_data(connection, "conversations", ('user1ID', 'user2ID'), [user_id, receiver_id])
        cursor.execute(f"""SELECT conversationID from conversations WHERE user1ID = '{user_id}' 
                           AND user2ID = '{receiver_id}'; """)
        time = get_palestine_date_time()
        conversation_id = cursor.fetchone()[0]
        insert_data(connection, "messages", ('conversationID', 'senderID', 'content', 'sendingTime'),
                    [conversation_id, user_id, body['messageContent'], time])
        cursor = connection.cursor()
        cursor.execute(f"""SELECT messageID from messages WHERE conversationID = '{conversation_id}' AND 
        senderID = '{user_id}' AND content = '{body['messageContent']}' AND sendingTime = '{time}'; """)
        message_id = cursor.fetchone()[0]
        cursor.execute(f"""SELECT fullName, img from user WHERE universityNumber = '{receiver_id}';""")
        data = cursor.fetchone()
        response = {
            "name": data[0],
            "imgURL": get_file_from_AWS(data[1]) if data[1] else None,
            "time": time,
            "conversationID": conversation_id,
            "messageId": message_id,
        }
        # *************************** send message via socket io
        handle_messages(conversation_id, message_id, time, body['messageContent'], user_id)
        return response, 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 409


@app.route('/add-message', methods=['POST'])
def add_message():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        body = request.get_json()
        query = f"""
            SELECT COUNT(*) AS permission_count
            FROM conversations c
            WHERE 
                c.conversationID = '{body['conversationId']}'
                AND '{user_id}' IN (c.user1ID, c.user2ID);
        """
        cursor = connection.cursor()
        cursor.execute(query)
        permission_count = cursor.fetchone()[0]
        if not (permission_count > 0):
            return {'message': 'UnAuthorized'}, 401
        time = get_palestine_date_time()
        insert_data(connection, "messages", ('conversationID', 'senderID', 'content', 'sendingTime'),
                    [body['conversationId'], user_id, body['messageContent'], time])
        cursor = connection.cursor()
        cursor.execute(f"""SELECT messageID from messages WHERE conversationID = '{body['conversationId']}' AND 
                senderID = '{user_id}' AND content = '{body['messageContent']}' AND sendingTime = '{time}'; """)
        message_id = cursor.fetchone()[0]
        cursor.execute("""
            UPDATE user
            SET lastReadMessage = %s
            WHERE universityNumber = %s;
        """, (message_id, user_id))
        connection.commit()
        # *************************** send message via socket io
        handle_messages(body['conversationId'], message_id, time, body['messageContent'], user_id)

        return {'message': "done", "lastMessageID": message_id}, 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 409
