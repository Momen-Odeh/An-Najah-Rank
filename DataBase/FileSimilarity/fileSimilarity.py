from FileSimilarity.SimilarityAWS import storeSimilarityAWS,getFileSimilarityAWS
from FlaskSetUp import app
from flask import request, jsonify, send_file
from dataBaseConnection import execute_query, fetch_results, update_data, delete_data
from MySQL_SetUp import connection
from fileManagment.deleteFileAWS import delete_file_from_AWS
from FileSimilarity.calculateSimilariy import calculateSimilariy
import pandas as pd

# {
    #     "challengeId": "30",
    #     "contestId": "67",
    #     "filesSimilarity": [
    #         {
    #             "SimilarFiles": [
    #                 {
    #                     "linesMatch": [
    #                         {
    #                             "f1Lines": "26-51",
    #                             "f2Lines": "15-36"
    #                         },
    #                         {
    #                             "f1Lines": "1-7",
    #                             "f2Lines": "1-7"
    #                         }
    #                     ],
    #                     "numLinesSimilar": 33,
    #                     "similarFileName": "Mohammad_zaied-11924574",
    #                     "similarPercentage": "65%"
    #                 },
    #                 {
    #                     "linesMatch": [
    #                         {
    #                             "f1Lines": "1-7",
    #                             "f2Lines": "1-7"
    #                         }
    #                     ],
    #                     "numLinesSimilar": 7,
    #                     "similarFileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
    #                     "similarPercentage": "12%"
    #                 }
    #             ],
    #             "fileName": "Momen_Hasan_Odeh-11923929",
    #             "totalNumSimilarityLine": 33,
    #             "totalSimilarRange": [
    #                 "1-7",
    #                 "26-51"
    #             ]
    #         },
    #         {
    #             "SimilarFiles": [
    #                 {
    #                     "linesMatch": [
    #                         {
    #                             "f1Lines": "1-7",
    #                             "f2Lines": "1-7"
    #                         }
    #                     ],
    #                     "numLinesSimilar": 7,
    #                     "similarFileName": "Momen_Hasan_Odeh-11923929",
    #                     "similarPercentage": "19%"
    #                 },
    #                 {
    #                     "linesMatch": [
    #                         {
    #                             "f1Lines": "1-7",
    #                             "f2Lines": "1-7"
    #                         }
    #                     ],
    #                     "numLinesSimilar": 7,
    #                     "similarFileName": "Mohammad_zaied-11924574",
    #                     "similarPercentage": "19%"
    #                 }
    #             ],
    #             "fileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
    #             "totalNumSimilarityLine": 7,
    #             "totalSimilarRange": [
    #                 "1-7"
    #             ]
    #         },
    #         {
    #             "SimilarFiles": [
    #                 {
    #                     "linesMatch": [
    #                         {
    #                             "f1Lines": "15-36",
    #                             "f2Lines": "26-51"
    #                         },
    #                         {
    #                             "f1Lines": "1-7",
    #                             "f2Lines": "1-7"
    #                         }
    #                     ],
    #                     "numLinesSimilar": 33,
    #                     "similarFileName": "Momen_Hasan_Odeh-11923929",
    #                     "similarPercentage": "90%"
    #                 },
    #                 {
    #                     "linesMatch": [
    #                         {
    #                             "f1Lines": "1-7",
    #                             "f2Lines": "1-7"
    #                         }
    #                     ],
    #                     "numLinesSimilar": 7,
    #                     "similarFileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
    #                     "similarPercentage": "16%"
    #                 }
    #             ],
    #             "fileName": "Mohammad_zaied-11924574",
    #             "totalNumSimilarityLine": 29,
    #             "totalSimilarRange": [
    #                 "1-7",
    #                 "15-36"
    #             ]
    #         }
    #     ]
    # }

@app.route('/file-Similarity', methods=['POST'])
def FileSimilarity():
    try:
        body = request.get_json()
        challengeId = body["challengeId"]
        contestId = body["contestId"]
        result = calculateSimilariy(contestId, challengeId)
        # return result,200
        result = {
            "challengeId":challengeId,
            "contestId":contestId,
            "filesSimilarity": result
        }
        #
        sql = f"""
                SELECT similarityFileKey FROM `an-najah rank`.contests_challenges
                 where challenge_id= '{challengeId}' and contest_id = '{contestId}';
                """
        cursor = execute_query(connection, sql)
        oldKey = fetch_results(cursor)
        if len(oldKey) == 0:
            return {"message": "not found contest or challenge"}, 404
        oldKey = oldKey[0][0]
        if oldKey is not None:
            delete_file_from_AWS(oldKey)
        #
        key = storeSimilarityAWS(result,contestId,challengeId)
        update_data(connection, 'contests_challenges', ["similarityFileKey"], (key),
                    f"(contest_id = '{contestId}' and challenge_id = '{challengeId}')")
        print(key)
        return result, 200
    except Exception as e:
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


@app.route('/pdTest', methods=['GET'])
def getFileSimilarityss():
    print("dddd")
    res = pd.read_html("http://moss.stanford.edu/results/4/8505676147501")[0].values
    print(res)
    return [1,11,2,5]

# http://moss.stanford.edu/results/9/5540085263002
# {
#     "challengeId": "30",
#     "contestId": "67",
#     "filesSimilarity": [
#         {
#             "SimilarFiles": [
#                 {
#                     "linesMatch": [
#                         {
#                             "f1Lines": "26-51",
#                             "f2Lines": "15-36"
#                         },
#                         {
#                             "f1Lines": "1-7",
#                             "f2Lines": "1-7"
#                         }
#                     ],
#                     "numLinesSimilar": 33,
#                     "similarFileName": "Mohammad_zaied-11924574",
#                     "similarPercentage": "65%"
#                 },
#                 {
#                     "linesMatch": [
#                         {
#                             "f1Lines": "1-7",
#                             "f2Lines": "1-7"
#                         }
#                     ],
#                     "numLinesSimilar": 7,
#                     "similarFileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
#                     "similarPercentage": "12%"
#                 }
#             ],
#             "fileName": "Momen_Hasan_Odeh-11923929",
#             "totalNumSimilarityLine": 33,
#             "totalSimilarRange": [
#                 "1-7",
#                 "26-51"
#             ]
#         },
#         {
#             "SimilarFiles": [
#                 {
#                     "linesMatch": [
#                         {
#                             "f1Lines": "15-36",
#                             "f2Lines": "26-51"
#                         },
#                         {
#                             "f1Lines": "1-7",
#                             "f2Lines": "1-7"
#                         }
#                     ],
#                     "numLinesSimilar": 33,
#                     "similarFileName": "Momen_Hasan_Odeh-11923929",
#                     "similarPercentage": "90%"
#                 },
#                 {
#                     "linesMatch": [
#                         {
#                             "f1Lines": "1-7",
#                             "f2Lines": "1-7"
#                         }
#                     ],
#                     "numLinesSimilar": 7,
#                     "similarFileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
#                     "similarPercentage": "16%"
#                 }
#             ],
#             "fileName": "Mohammad_zaied-11924574",
#             "totalNumSimilarityLine": 29,
#             "totalSimilarRange": [
#                 "1-7",
#                 "15-36"
#             ]
#         },
#         {
#             "SimilarFiles": [
#                 {
#                     "linesMatch": [
#                         {
#                             "f1Lines": "1-7",
#                             "f2Lines": "1-7"
#                         }
#                     ],
#                     "numLinesSimilar": 7,
#                     "similarFileName": "Momen_Hasan_Odeh-11923929",
#                     "similarPercentage": "19%"
#                 },
#                 {
#                     "linesMatch": [
#                         {
#                             "f1Lines": "1-7",
#                             "f2Lines": "1-7"
#                         }
#                     ],
#                     "numLinesSimilar": 7,
#                     "similarFileName": "Mohammad_zaied-11924574",
#                     "similarPercentage": "19%"
#                 }
#             ],
#             "fileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
#             "totalNumSimilarityLine": 7,
#             "totalSimilarRange": [
#                 "1-7"
#             ]
#         }
#     ]
# }