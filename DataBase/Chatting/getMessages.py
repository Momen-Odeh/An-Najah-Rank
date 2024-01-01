from FlaskSetUp import app
from MySQL_SetUp import connection
from flask import request, jsonify


@app.route('/get-messages', methods=['GET'])
def get_notifications():
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
        conversations = [{'conversationID': conversation[0], 'name': conversation[1], 'imgURL': conversation[2],
                          'lastMessageTime': conversation[3]} for conversation in data]
        return jsonify({"messages": conversations}), 200

    except Exception as e:
        print(e)
        return {'message': str(e)}, 409
