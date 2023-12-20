from FlaskSetUp import app
from flask import request, jsonify
from dataBaseConnection import insert_data, execute_query, fetch_results
from MySQL_SetUp import connection
from fileManagment.uploadFile import upload_file
from fileManagment.getLanguageType import get_language_type
import requests
import os
from datetime import datetime
from FlaskSetUp import backend_base_url
@app.route('/student-challenge-submissions', methods=['POST'])
def add_challenge_student():
    try:
        data = request.get_json()
        tokenData = getattr(request, 'tokenData', None)
        code = data['code']
        language = data['language']
        # ****************************************
        query = f"""
                                    SELECT *
                                    FROM contests 
                                    WHERE 
                                    id ='{data['contestId']}';
                                """
        cursor = connection.cursor()
        cursor.execute(query)
        contest = cursor.fetchone()

        if (contest[4] == 1 and datetime.now() > contest[5]):
            return jsonify({"message": "No more submissions, time ended"}), 401
        # ****************************************
        testCases = get_test_cases(data['challengeId'])
        input = [test_case["input_data"] for test_case in testCases]
        output = [test_case["output_data"] for test_case in testCases]
        languageAPI=language
        if(languageAPI=="cpp"):
            languageAPI="c"
        dataResponse = requests.post(f'{backend_base_url}/{languageAPI}', json={"code": code, "input": input})
        response_json = dataResponse.json()
        dataResponse = response_json.get("output", [])
        testCasesResult = []
        submissionResult = 0
        totalStrength = 0
        CompilationError = None
        if dataResponse:
            for i in range(len(output)):
                testCasesResult.append(1 if output[i].strip() == dataResponse[i][1].strip() else 0)
                if output[i].strip() == dataResponse[i][1].strip():
                    submissionResult += testCases[i]['strength']
                totalStrength += testCases[i]['strength']
            submissionResult = round((submissionResult / totalStrength) * 100)
            print(dataResponse)
        else: # if compilation error occur
            testCasesResult = [0 for x in output]
            print(response_json)
            CompilationError = response_json['stderr']

        print(testCasesResult)
        print(submissionResult)
        extention = 'c'
        if(language == "java"):
            extention = 'java'
        elif(language=="python"):
            extention = 'py'
        elif (language == "javascript"):
            extention = 'js'
        elif (language == "regularexpression"):
            extention = 'txt'
        elif (language == "cpp"):
            extention = 'cpp'
        fullPath = os.path.abspath(os.path.join("code", f"file.{extention}"))
        print(f"Full path: {fullPath}")
        with open(fullPath, "w", encoding="utf-8") as file:
            file.write(code)
        with open(fullPath, 'rb') as file:
            fileKey = upload_file(file, f"code/{data['courseNumber']}_{data['challengeId']}/{tokenData['email']}", fullPath)
        with open(fullPath, 'r') as file:
            lines = file.readlines()
            numberOfLines = len(lines)
        submissionTime = datetime.now()
        result = insert_data(
            connection,
            'student_submissions',
            ['studentUniversityNumber', 'courseNumber', 'challengeId', 'submissionFileKey',
             'submissionTime', 'submissionResult', 'compilationError', 'numberOfLines', 'contestId'],
            (tokenData['universityNumber'], data['courseNumber'], data['challengeId'], fileKey,
             submissionTime, submissionResult, CompilationError, numberOfLines, data['contestId'])
        )
        query = """
            SELECT id FROM student_submissions
            WHERE studentUniversityNumber = %s
            AND courseNumber = %s
            AND challengeId = %s
            AND submissionFileKey = %s
            AND submissionResult = %s
            AND contestId = %s
            ORDER BY id
        """
        values = (
            tokenData['universityNumber'],
            data['courseNumber'],
            data['challengeId'],
            fileKey,
            submissionResult,
            data['contestId']
        )

        cursor = connection.cursor()
        cursor.execute(query, values)
        res = cursor.fetchall()
        submissionId = res[len(res)-1]
        add_submission_testCases(submissionId, [test_case['id'] for test_case in testCases], testCasesResult, dataResponse)
        return jsonify({"submissionId": submissionId}), 201
    except Exception as e:
        return {'message': str(e)}, 400


def get_test_cases(challengeId):
    try:
        query = f"SELECT * from test_cases WHERE challenge_id = {challengeId}"
        cursor = execute_query(connection, query)
        result = fetch_results(cursor)
        testCases=[]
        for testCase in result:
            testCases.append({
                "id": testCase[0],
                "input_data": testCase[2],
                "output_data": testCase[3],
                "strength": testCase[4],
                "is_sample": testCase[5]
            })
        return testCases
    except Exception as e:
        return {'message': str(e)}, 409

def add_submission_testCases(submissionId, testCaseId, testCasesResult, out):
    try:
        if not out:
            out = [[None, None, None] for i in testCasesResult]
        for i in range(len(testCasesResult)):
            result = insert_data(
                connection,
                'submission_testCases',
                ['submissionId', 'testCaseId', 'status', 'stdout', 'stderr'],
                (submissionId, testCaseId[i], testCasesResult[i], out[i][1] if out[i][0] == True else None, out[i][2] if out[i][0] == False else None)
            )
        return result, 201
    except Exception as e:
        return {'message': str(e)}, 409

@app.route('/student_submissions', methods=['GET'])
def get_student_submissions():
    try:
        tokenData = getattr(request, 'tokenData', None)
        student_university_number = tokenData['universityNumber']
        print(student_university_number)
        course_number = request.args.get('courseNumber')
        contest_id = request.args.get('contestId')
        challenge_id = request.args.get('challengeId')
        challenge_details_query = f"SELECT name FROM challenges WHERE id = '{challenge_id}'"
        contest_challenge_details_query = f"SELECT max_score FROM contests_challenges WHERE challenge_id = %s AND contest_id = %s "

        submission_query = f"SELECT * FROM student_submissions WHERE studentUniversityNumber = '{student_university_number}' " \
                           f"AND courseNumber = '{course_number}' AND challengeId = '{challenge_id}' AND contestId = '{contest_id}'"

        cursor = execute_query(connection, submission_query)
        results = fetch_results(cursor)
        cursor = connection.cursor()
        cursor.execute(challenge_details_query)
        name = cursor.fetchone()
        cursor.execute(contest_challenge_details_query,(challenge_id, contest_id))
        maxScore = cursor.fetchone()
        submissions = []
        for item in results:
            key = item[4]
            language = get_language_type(key)
            submissions.append({
                "submissionId": item[0],
                "challengeName": name[0],
                "score": (maxScore[0]*item[6])/100,
                "submissionTime": item[5],
                "language": language,
                "result": "Accepted" if item[6]==100 else "Wrong Answer"
            })
        return jsonify({"submissions": submissions}), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500