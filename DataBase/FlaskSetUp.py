from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import pytz
from datetime import datetime
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")#http://localhost:3000
backend_base_url = "http://backend:5000"
# backend_base_url = "http://127.0.0.1:5000"
app.config['SECRET_KEY'] = "tsfyguaistyatuis589566875623568956"
app.config['MAIL_SERVER'] = "smtp.googlemail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = "an.najah.rank@gmail.com"
app.config['MAIL_PASSWORD'] = "rfjk robs wklz svvc"


def get_palestine_date_time():
    palestine_timezone = pytz.timezone('Asia/Gaza')
    palestine_time = datetime.now(palestine_timezone)
    formatted_palestine_time = palestine_time.strftime('%Y-%m-%d %H:%M:%S')
    return formatted_palestine_time

