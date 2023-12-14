from FlaskSetUp import app
from flask import request, jsonify
from APIs.student_submissions import get_test_cases
import requests

@app.route('/run_challenge_code', methods=['POST'])
def run_challenge_code():
    try:
        data = request.get_json()
        code = data['code']
        language = data['language']
        testCases = get_test_cases(data['challengeId'])
        input = [test_case["input_data"]  for test_case in testCases if test_case['is_sample']==1]
        if(language=="cpp"):
            language="c"
        dataResponse = requests.post(f'http://127.0.0.1:5001/{language}', json={"code": code, "input": input})
        response_json = dataResponse.json()
        dataResponse = response_json.get("output", [])
        if dataResponse:
            print(dataResponse)
            return jsonify({"dataResponse": dataResponse})
        elif response_json['stderr']:  # if compilation error occur
            return jsonify({"stderr": response_json['stderr']}), 400
    except Exception as e:
        return {"error": e}, 400
