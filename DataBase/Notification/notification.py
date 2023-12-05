from FlaskSetUp import socketio
from flask import request
from datetime import datetime

online_users = []


def add_new_user(user_university_number, socket_id):
    if not any(user['user_university_number'] == user_university_number for user in online_users):
        online_users.append({'user_university_number': int(user_university_number), 'socket_id': socket_id})


def remove_user(socket_id):
    global online_users
    online_users = [user for user in online_users if user['socket_id'] != socket_id]


def get_user(user_university_number):
    return next((user for user in online_users if user['user_university_number'] == user_university_number), None)


@socketio.on('connect')
def handle_connect():
    user_university_number = request.args.get('user_university_number')
    add_new_user(user_university_number, request.sid)
    print(user_university_number + "  ****  " + request.sid)


@socketio.on('disconnect')
def handle_disconnect():
    remove_user(request.sid)
    print("disconnected  ****  " + request.sid)


@socketio.on('add_user')
def add_user_notification(data):
    user_university_number = data.get('user')
    notification = {
        'title': f'New item added from {user_university_number}',
        'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    print("user_university_number", user_university_number)
    if(user_university_number==1478):
        user_university_number = 11923929
    else:
        user_university_number = 1478
    user = get_user(user_university_number)

    if user:
        socketio.emit('notification', notification, room=user['socket_id'])
