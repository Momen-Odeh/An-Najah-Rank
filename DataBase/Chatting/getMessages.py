from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify
from fileManagment.getFileAWS import get_file_from_AWS


@app.route('/get-conversations', methods=['GET'])
def get_conversations():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        params = request.args
        get_all = int(params['all'])
        query = f"""
                    SELECT 
                        c.conversationID,
                        CASE 
                            WHEN c.user1ID = '{user_id}' THEN u2.fullName
                            ELSE u1.fullName
                        END AS name,
                        CASE 
                            WHEN c.user1ID = '{user_id}' THEN u2.img
                            ELSE u1.img
                        END AS imgURL,
                        MAX(m.sendingTime) AS lastMessageTime
                    FROM 
                        conversations c
                    JOIN 
                        user u1 ON c.user1ID = u1.universityNumber
                    JOIN 
                        user u2 ON c.user2ID = u2.universityNumber
                    LEFT JOIN 
                        messages m ON c.conversationID = m.conversationID
                    WHERE 
                        '{user_id}' IN (c.user1ID, c.user2ID)
                        AND (c.user1ID != '{user_id}' OR c.user2ID != '{user_id}')
                    GROUP BY
                        c.conversationID, name, imgURL;
                 """
        if get_all == 0:
            query += " limit 10"
        cursor = connection.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        conversations = [{'conversationID': conversation[0], 'name': conversation[1],
                          'imgURL': get_file_from_AWS(conversation[2]) if conversation[2] else None,
                          'lastMessageTime': conversation[3]} for conversation in data]
        cursor = connection.cursor()
        cursor.execute(f"""SELECT lastReadMessage from user WHERE universityNumber = '{user_id}' """)
        lastReadMessage = cursor.fetchone()[0]
        return jsonify({"conversations": conversations, "lastReadMessage": lastReadMessage}), 200

    except Exception as e:
        print(e)
        return {'message': str(e)}, 409


@app.route('/get-messages', methods=['GET'])
def get_messages():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        params = request.args
        conversationID = int(params['conversationID'])
        query = f"""
            SELECT COUNT(*) AS permission_count
            FROM conversations c
            WHERE 
                c.conversationID = '{conversationID}'
                AND '{user_id}' IN (c.user1ID, c.user2ID);
        """
        cursor = connection.cursor()
        cursor.execute(query)
        permission_count = cursor.fetchone()[0]
        if not (permission_count > 0):
            return {'message': 'UnAuthorized'}, 401
        query = f"""
                    SELECT * FROM messages WHERE conversationID = '{conversationID}';
                 """
        cursor = connection.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        messages = [{'messageID': message[0], 'message': message[3],
                     'time': message[4].strftime('%Y-%m-%d %H:%M:%S'), 'myMessage': int(message[2]) == int(user_id)} for message in data]

        return jsonify({"messages": messages}), 200

    except Exception as e:
        print(e)
        return {'message': str(e)}, 409


@app.route('/update-last-message', methods=['POST'])
def update_last_message():
    try:
        tokenData = getattr(request, 'tokenData', None)
        user_id = tokenData['universityNumber']
        body = request.get_json()
        cursor = connection.cursor()
        cursor.execute(f"""
                            SELECT messageID from messages WHERE content = '{body['content']}' 
                            AND sendingTime = '{body['time']}' AND conversationID = '{body['conversationID']}'; """)
        message_id = cursor.fetchone()[0]

        cursor.execute("""
            UPDATE user
            SET lastReadMessage = %s
            WHERE universityNumber = %s;
        """, (message_id, user_id))
        connection.commit()
        return {'message': "done"}, 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 409
