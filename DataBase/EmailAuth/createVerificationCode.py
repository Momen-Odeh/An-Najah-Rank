import random
import string
import datetime
from flask import jsonify
from dataBaseConnection import insert_data,update_data
from MySQL_SetUp import connection
from  EmailAuth.emailConnection import sendEmail
def genrateRandomCode():
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(6))
    return random_string

def createVerificationCode(email):
    code = genrateRandomCode()
    TTL = datetime.datetime.now() + datetime.timedelta(minutes=20)
    print(email, code, TTL)
#
    try:
        result = insert_data(connection,'code_verification', ['email','code','TTL'],(email,code,TTL))
        print(result[1])
        if (result[1] == 409):
            print("Update")
            update_data(connection, 'code_verification', ['code', 'TTL'], (code, TTL),f"(`email` = '{email}')")

        msg =  "Hi, \n" \
               "We just need to verify your email address before you can access An Najah Rank.\n" \
               "Verify your email address by enter this code:\n" \
               f"{code}\n" \
               "Thanks! – \nThe An Najah Rank team\n"

        return(sendEmail(email,"An Najah Rank Verification Code",msg))

    except Exception as e:
        print(f"Error while registering user: {e}")
#

