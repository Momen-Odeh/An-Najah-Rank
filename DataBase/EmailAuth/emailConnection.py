from flask_mail import Mail,Message
from FlaskSetUp import app
mail = Mail(app)
def sendEmail(email,title,body):
    sender = "An Najah Rank"
    msg = Message(title,sender=sender,recipients=[email])
    msg.body = body
    try:
        mail.send(msg)
        return "Email sent successfully"
    except Exception as e:
        print(e)
        return f"the email was not sent {e}"
