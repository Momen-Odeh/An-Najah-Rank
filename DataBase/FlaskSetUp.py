from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")#http://localhost:3000
app.config['SECRET_KEY'] = "tsfyguaistyatuis589566875623568956"
app.config['MAIL_SERVER'] = "smtp.googlemail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = "an.najah.rank@gmail.com"
app.config['MAIL_PASSWORD'] = "rfjk robs wklz svvc"