from FlaskSetUp import app, get_palestine_date_time
from MySQL_SetUp import connection
from flask import request
from dataBaseConnection import insert_data


@app.route('/add-conversation', methods=['POST'])
def add_conversation():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        body = request.get_json()

        cursor = connection.cursor()
        cursor.execute(f"""SELECT universityNumber from user WHERE email = '{body['receiverEmail']}'; """)
        receiver_id = cursor.fetchone()[0]
        if not receiver_id:
            return {"message": "receiver not found"}, 404
        insert_data(connection, "conversations", ('user1ID', 'user2ID'), [user_id, receiver_id])
        cursor.execute(f"""SELECT conversationID from conversations WHERE user1ID = '{user_id}' 
                           AND user2ID = '{receiver_id}'; """)
        conversation_id = cursor.fetchone()[0]
        insert_data(connection, "messages", ('conversationID', 'senderID', 'content', 'sendingTime'),
                    [conversation_id, user_id, body['messageContent'], get_palestine_date_time()])

        # *************************** send message via socket io

        return {'message': "done"}, 200
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

        insert_data(connection, "messages", ('conversationID', 'senderID', 'content', 'sendingTime'),
                    [body['conversationId'], user_id, body['messageContent'], get_palestine_date_time()])

        # *************************** send message via socket io

        return {'message': "done"}, 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 409
