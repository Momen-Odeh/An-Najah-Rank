from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
from authentication import get_Data_from_token
import datetime
import json

@app.route('/user/<id>', methods=['GET'])
def getUserInfo(id):
    return id