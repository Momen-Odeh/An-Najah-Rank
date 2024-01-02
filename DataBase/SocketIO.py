from FlaskSetUp import socketio
from flask import request
from collections import defaultdict

online_users = defaultdict(list)


def add_new_user(user_university_number, socket_id):
    online_users[user_university_number].append(socket_id)
    print("online_users ", online_users)


def remove_user(socket_id):
    global online_users
    for user, sockets in online_users.items():
        if socket_id in sockets:
            sockets.remove(socket_id)
            if not sockets:
                del online_users[user]
            break
    print("online_users ", online_users)


def get_user(user_university_number):
    return online_users.get(user_university_number)


@socketio.on('connect')
def handle_connect():
    user_university_number = request.args.get('user_university_number')
    add_new_user(user_university_number, request.sid)
    print("connected ***  "+user_university_number + "  ****  " + request.sid)


@socketio.on('disconnect')
def handle_disconnect():
    remove_user(request.sid)
    print("disconnected  ****  " + request.sid)


def send_notification_to_user(user_university_number, notification, target):
    sockets = get_user(user_university_number)
    if sockets:
        for socket_id in sockets:
            socketio.emit(target, notification, room=socket_id)

