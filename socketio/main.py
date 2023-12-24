from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)

online_users = []


@app.route('/')
def hello_world():
    print(online_users)
    return 'Hello World'


def add_new_user(user_university_number, socket_id):
    if not any(user['user_university_number'] == user_university_number for user in online_users):
        online_users.append({'user_university_number': int(user_university_number), 'socket_id': socket_id})


def remove_user(socket_id):
    global online_users
    online_users = [user for user in online_users if user['socket_id'] != socket_id]


def get_user(user_university_number):
    return next((user for user in online_users if int(user['user_university_number']) == int(user_university_number)), None)


@socketio.on('connect')
def handle_connect():
    user_university_number = request.args.get('user_university_number')
    add_new_user(user_university_number, request.sid)
    print(user_university_number + "  ****  " + request.sid)


@socketio.on('disconnect')
def handle_disconnect():
    remove_user(request.sid)
    print("disconnected  ****  " + request.sid)


@socketio.on('/testConn')
def handle_test_connection(data):
    print(f"Received test connection: {data}")


@app.route('/send-notification', methods=['POST'])
def handle_notification():
    data = request.get_json()
    user_ids = data.get('user_ids', [])
    notification = data.get('notification')

    for user_id in user_ids:
        u = get_user(user_id)
        if u:
            print("send notification to ", user_id)
            socketio.emit('notification', notification, room=u['socket_id'])

    return jsonify({"message": "Notification sent successfully"})


if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True, port=5004, host='0.0.0.0')
