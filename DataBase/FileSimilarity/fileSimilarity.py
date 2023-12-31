from builtins import enumerate

from FileSimilarity.SimilarityAWS import storeSimilarityAWS,getFileSimilarityAWS
from FlaskSetUp import app
from flask import request, jsonify, send_file
from dataBaseConnection import execute_query, fetch_results, update_data, delete_data
from MySQL_SetUp import connection
from fileManagment.deleteFileAWS import delete_file_from_AWS
from fileManagment.getFileContent import get_file_content
from FileSimilarity.calculateSimilariy import calculateSimilariy
from guard.professorAccess.AccessChallengeView import accessChallengeViewProfessor
from Notification.notification import handle_notification

@app.route('/file-Similarity', methods=['POST'])
def FileSimilarity():
    try:
        body = request.get_json()
        challengeId = body["challengeId"]
        contestId = body["contestId"]
        courseId = body["courseId"]
        tokenData = getattr(request, 'tokenData', None)
        universityNumber = tokenData['universityNumber']
        sql = f"""
                        SELECT similarityFileKey FROM `an-najah rank`.contests_challenges
                         where challenge_id= '{challengeId}' and contest_id = '{contestId}';
                        """
        cursor = execute_query(connection, sql)
        oldKey = fetch_results(cursor)
        update_data(
            connection,
            'contests_challenges',
            ['similarityFileKey'],
            ['in progress'],
            f"(contest_id = '{contestId}' and challenge_id = '{challengeId}')"
        )
        app.logger.info("******************* start calculate *************")
        cursor = connection.cursor()
        cursor.execute(f"""
                                    SELECT name from courses
                                    WHERE  courseNumber = '{courseId}'
                                """)
        course_name = cursor.fetchone()[0]

        result = calculateSimilariy(contestId, challengeId)
        if result is None:
            handle_notification(False, f"""Failed in calculate similarity for submissions in {course_name}
                                       course, please try again later""",
                                [universityNumber])
            raise Exception("Similarity server fails")
        result = {
            "challengeId":challengeId,
            "contestId":contestId,
            "filesSimilarity": result
        }

        for index, f in enumerate(result["filesSimilarity"]):
            idUNV = f["fileName"].split("-")[-1]
            simNumLine = f["totalNumSimilarityLine"]
            # add condition to get last file
            sql = f"""
                            SELECT numberOfLines FROM student_submissions where 
                            studentUniversityNumber = '{idUNV}';
                            """
            cursor = execute_query(connection, sql)
            sqlRes = fetch_results(cursor)
            # print(sqlRes)
            totalLine = sqlRes[0][0]
            sim = (simNumLine / totalLine) * 100
            sim = int(sim)
            # print(idUNV, "      ", simNumLine, "         ", totalLine,"        ",sim)
            # add sim to file
            result["filesSimilarity"][index]["similarity"] = sim
            result["filesSimilarity"][index]["numberOfLines"] = totalLine
            # make correction for the update **********************************************************************
            update_data(connection, 'student_submissions', ["similarity"], (sim),
                        f"studentUniversityNumber = '{idUNV}';")
        # **************************************************************************************************************
        update_data(connection, 'student_submissions', ["similarity"], (0),
                    f"`similarity` IS NULL and `id` >= 0;")
        if len(oldKey) == 0:
            return {"message": "not found contest or challenge"}, 404
        oldKey = oldKey[0][0]
        if oldKey is not None:
            delete_file_from_AWS(oldKey)
        key = storeSimilarityAWS(result,contestId,challengeId)
        update_data(connection, 'contests_challenges', ["similarityFileKey"], (key),
                    f"(contest_id = '{contestId}' and challenge_id = '{challengeId}')")
        app.logger.info(f"file key: {key}")
        handle_notification(False, f"Similarity data ready for submissions in {course_name} course", [universityNumber])
        return result, 200
    except Exception as e:
        app.logger.error("error ******************", e)
        update_data(
            connection,
            'contests_challenges',
            ['similarityFileKey'],
            [None],
            f"(contest_id = '{contestId}' and challenge_id = '{challengeId}')"
        )
        return {"error": e}, 409

@app.route('/file-Similarity', methods=['GET'])
def getFileSimilarity():
    try:
        params = request.args
        contestId = params['contestId']
        challengeId = params['challengeId']
        sql = f"""
        SELECT similarityFileKey FROM `an-najah rank`.contests_challenges
         where challenge_id= '{challengeId}' and contest_id = '{contestId}';
        """
        cursor = execute_query(connection,sql)
        key = fetch_results(cursor)
        if len(key) == 0:
            return {"message":"not found contest or challenge"}, 404
        key = key[0][0]
        if key is None:
            return {"message": "not found similarity file"}, 404
        fileContent = getFileSimilarityAWS(key)
        return fileContent,200
    except Exception as e:
        return {"error": e}, 409


@app.route('/userSimilarity', methods=['GET'])
def getUserSimilarity():
    try:
        params = request.args
        contestId = params['contestId']
        challengeId = params['challengeId']
        userId = params['userId']
        courseId = params['courseId']
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if role != 'professor' and role != 'admin':
            return {'message': "unauthorized role"}, 401
        access = accessChallengeViewProfessor(courseId, contestId, challengeId, tokenData['universityNumber'])
        if not access:
            return {'message': "unauthorized role professor"}, 401
        sql = f"""
        SELECT similarityFileKey FROM `an-najah rank`.contests_challenges
         where challenge_id= '{challengeId}' and contest_id = '{contestId}';
        """
        cursor = execute_query(connection, sql)
        key = fetch_results(cursor)
        if len(key) == 0:
            return {"message": "not found contest or challenge"}, 404
        key = key[0][0]
        app.logger.info("key file similarity", key[0][0])
        if key is None:
            return {"message": "not found similarity file"}, 404
        fileContent = getFileSimilarityAWS(key)
        app.logger.info("fileContent", fileContent)
        arr = fileContent["filesSimilarity"]

        # Iterate through the array and find the object with the specified file number
        desired_object = next((item for item in arr if userId in item["fileName"]), None)
        if desired_object:
            app.logger.info("Found the desired object:")
            # return desired_object, 200
        else:
            app.logger.info("Object not found with fileName containing", userId)
            return {"message": "Not found user"}, 404

        uId = desired_object["fileName"].split("-")[-1]
        sql = f"""
                    SELECT submissionFileKey FROM student_submissions where
                    studentUniversityNumber = '{uId}';
            """
        cursor = execute_query(connection, sql)
        sqlRes = fetch_results(cursor)
        keyUid = sqlRes[0][0]
        contentUid = get_file_content(keyUid)
        desired_object["code"] = contentUid
        # print(desired_object["fileName"].split("-")[-1])
        for index,fileCNT in enumerate(desired_object["SimilarFiles"]):
            # print(fileCNT["similarFileName"].split("-")[-1])
            uId = fileCNT["similarFileName"].split("-")[-1]
            sql = f"""
                                SELECT submissionFileKey FROM student_submissions where
                                studentUniversityNumber = '{uId}';
                        """
            cursor = execute_query(connection, sql)
            sqlRes = fetch_results(cursor)
            keyUid = sqlRes[0][0]
            contentUid = get_file_content(keyUid)
            desired_object["SimilarFiles"][index]["code"] = contentUid
        return desired_object, 200

    except Exception as e:
        app.logger.error(f"error in get file similarity: {e}")
        return {"error": str(e)}, 409

