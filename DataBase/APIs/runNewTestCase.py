from MySQL_SetUp import connection
from dataBaseConnection import execute_query, fetch_results, insert_data, update_data
from fileManagment.getFileContent import get_file_content
from fileManagment.getLanguageType import get_language_type
import requests
from FlaskSetUp import app
from flask import request, jsonify
from Notification.notification import handle_notification


@app.route('/run-new-test-case', methods=['POST'])
def run_new_test_case():
    try:
        data = request.get_json()
        contest_ids = data.get('contestIds', [])
        test_case_id = data['testCaseId']
        challenge_id = data['challengeId']
        operation = data['operation']
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if (not (role == 'professor' or role == 'admin')) or (len(contest_ids) <= 0):
            return jsonify({"message": "Access Denied"}), 401
        contest_ids_str = ', '.join(map(lambda x: f"'{x}'", contest_ids))
        submissions = fetch_results(execute_query(connection,
                                                  f"""SELECT id, submissionFileKey, studentUniversityNumber, 
                                                  submissionResult FROM student_submissions
                                                  WHERE contestId IN ({contest_ids_str}) 
                                                  AND challengeId = '{challenge_id}';"""), )
        print("submissions", submissions)
        cursor = connection.cursor()
        cursor.execute(f"""SELECT * FROM test_cases WHERE id = '{test_case_id}';""")
        test_case = cursor.fetchone()  # id, challengeId, input data, output data, strength
        print("test_case", test_case)
        for submission in submissions:  # submissionId, submissionFileKey, studentUniversityNumber, submissionResult
            code = get_file_content(submission[1])
            lang = get_language_type(submission[1])
            if (lang == "c++"):
                lang = "c"
            dataResponse = requests.post(f'http://127.0.0.1:5001/{lang}', json={"code": code,
                                                                                       "input": [test_case[2]]})
            response_json = dataResponse.json()
            dataResponse = response_json.get("output", [])
            print("dataResponse", dataResponse)
            test_case_result = 0
            test_case_score = 0
            if dataResponse:
                if test_case[3].strip() == dataResponse[0][1].strip():
                    test_case_result = 1
                    test_case_score = 100
            print("test_case_score", test_case_score)
            submitted_test_cases = fetch_results(execute_query(connection, f"""SELECT stc.status, tc.strength, tc.id
            FROM submission_testCases stc join test_cases tc on stc.testCaseId = tc.id
             WHERE stc.submissionId = '{submission[0]}';"""), )  # status, strength, id
            old_strength = 0
            prev_update = -1
            for submission_test_case in submitted_test_cases:
                if int(submission_test_case[2]) != int(test_case_id):
                    old_strength += submission_test_case[1]
                elif submission_test_case[0]==1:
                    prev_update = submission_test_case[1]
                else:
                    prev_update = 0
            total_strength = old_strength + test_case[4]
            print("old_strength + test_case[4]",old_strength ,test_case[4])
            if prev_update != -1:
                total_score = round((submission[3]-((prev_update/total_strength)*100)) +
                                    ((test_case[4] / total_strength) * test_case_score))
            else:
                total_score = round(((old_strength / total_strength) * submission[3]) +
                                ((test_case[4] / total_strength) * test_case_score))
            if (not dataResponse or len(dataResponse)==0):
                dataResponse.append([False, None, None])
            if operation == "create":
                insert_data(connection, 'submission_testCases',
                            ['submissionId', 'testCaseId', 'status', 'stdout', 'stderr'],
                            (submission[0], test_case_id, test_case_result,
                             dataResponse[0][1] if dataResponse[0][0] == True else None,
                             dataResponse[0][2] if dataResponse[0][0] == False else None))
            else:
                update_data(connection, 'submission_testCases', ['status', 'stdout', 'stderr'],
                            (test_case_result,
                             dataResponse[0][1] if dataResponse[0][0] == True else None,
                             dataResponse[0][2] if dataResponse[0][0] == False else None),
                            f"submissionId = '{submission[0]}' AND testCaseId = '{test_case_id}'"
                            )

            update_data(connection, 'student_submissions', ['submissionResult'],
                        (total_score),
                        f"id = '{submission[0]}'"
                        )
        handle_notification(False, f"""Running test case on contests selected with challenge id 
                                   {challenge_id} finish successfully """, [tokenData['universityNumber']], )
        return jsonify({'message': "ok"}), 200
    except Exception as e:
        return {'message': str(e)}, 409
