from builtins import enumerate

from FileSimilarity.SimilarityAWS import storeSimilarityAWS,getFileSimilarityAWS
from FlaskSetUp import app
from flask import request, jsonify, send_file
from dataBaseConnection import execute_query, fetch_results, update_data, delete_data
from MySQL_SetUp import connection
from fileManagment.deleteFileAWS import delete_file_from_AWS
from fileManagment.getFileContent import get_file_content
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
        # result = calculateSimilariy(contestId, challengeId)
        # result = {
        #     "challengeId":challengeId,
        #     "contestId":contestId,
        #     "filesSimilarity": result
        # }
        # **************************************************************************************************************
        result = {
            "challengeId": "30",
            "contestId": "67",
            "filesSimilarity": [
                {
                    "SimilarFiles": [
                        {
                            "linesMatch": [
                                {
                                    "f1Lines": "26-51",
                                    "f2Lines": "15-36"
                                },
                                {
                                    "f1Lines": "1-7",
                                    "f2Lines": "1-7"
                                }
                            ],
                            "numLinesSimilar": 33,
                            "similarFileName": "Mohammad_zaied-11924574",
                            "similarPercentage": "65%"
                        },
                        {
                            "linesMatch": [
                                {
                                    "f1Lines": "1-7",
                                    "f2Lines": "1-7"
                                }
                            ],
                            "numLinesSimilar": 7,
                            "similarFileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
                            "similarPercentage": "12%"
                        }
                    ],
                    "fileName": "Momen_Hasan_Odeh-11923929",
                    "totalNumSimilarityLine": 33,
                    "totalSimilarRange": [
                        "1-7",
                        "26-51"
                    ]
                },
                {
                    "SimilarFiles": [
                        {
                            "linesMatch": [
                                {
                                    "f1Lines": "1-7",
                                    "f2Lines": "1-7"
                                }
                            ],
                            "numLinesSimilar": 7,
                            "similarFileName": "Momen_Hasan_Odeh-11923929",
                            "similarPercentage": "19%"
                        },
                        {
                            "linesMatch": [
                                {
                                    "f1Lines": "1-7",
                                    "f2Lines": "1-7"
                                }
                            ],
                            "numLinesSimilar": 7,
                            "similarFileName": "Mohammad_zaied-11924574",
                            "similarPercentage": "19%"
                        }
                    ],
                    "fileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
                    "totalNumSimilarityLine": 7,
                    "totalSimilarRange": [
                        "1-7"
                    ]
                },
                {
                    "SimilarFiles": [
                        {
                            "linesMatch": [
                                {
                                    "f1Lines": "15-36",
                                    "f2Lines": "26-51"
                                },
                                {
                                    "f1Lines": "1-7",
                                    "f2Lines": "1-7"
                                }
                            ],
                            "numLinesSimilar": 33,
                            "similarFileName": "Momen_Hasan_Odeh-11923929",
                            "similarPercentage": "90%"
                        },
                        {
                            "linesMatch": [
                                {
                                    "f1Lines": "1-7",
                                    "f2Lines": "1-7"
                                }
                            ],
                            "numLinesSimilar": 7,
                            "similarFileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
                            "similarPercentage": "16%"
                        }
                    ],
                    "fileName": "Mohammad_zaied-11924574",
                    "totalNumSimilarityLine": 29,
                    "totalSimilarRange": [
                        "1-7",
                        "15-36"
                    ]
                }
            ]
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


@app.route('/userSimilarity', methods=['GET'])
def getUserSimilarity():
    try:
        params = request.args
        contestId = params['contestId']
        challengeId = params['challengeId']
        userId = params['userId']
        # sql = f"""
        # SELECT similarityFileKey FROM `an-najah rank`.contests_challenges
        #  where challenge_id= '{challengeId}' and contest_id = '{contestId}';
        # """
        # cursor = execute_query(connection, sql)
        # key = fetch_results(cursor)
        # if len(key) == 0:
        #     return {"message": "not found contest or challenge"}, 404
        # key = key[0][0]
        # if key is None:
        #     return {"message": "not found similarity file"}, 404
        # fileContent = getFileSimilarityAWS(key)
        # arr = fileContent["filesSimilarity"]
        #
        # # Iterate through the array and find the object with the specified file number
        # desired_object = next((item for item in arr if userId in item["fileName"]), None)
        # if desired_object:
        #     print("Found the desired object:")
        #     return desired_object, 200
        # else:
        #     print("Object not found with fileName containing", userId)
        #     return {"message": "Not found user"}, 404
        desired_object={
    "SimilarFiles": [
        {
            "code": "import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n    int arraysize;\n    int[][] data;\n    int M = (int) Double.NEGATIVE_INFINITY;\n\n    Solution() {\n    }\n\n    int f(int i, int j) {\n        if (i == arraysize - 1 && j == arraysize - 1) return data[i][j];\n        int n1 = 0, n2 = 0;\n        if (j < arraysize && i < arraysize) {\n            n1 = data[i][j] + f(i, j + 1);\n            n2 = data[i][j] + f(i + 1, j);\n        }\n        if (n1 < n2) return n2;\n        else return n1;\n    }\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n        Solution sol = new Solution();\n        int Y = sol.f(0, 0);\n        for (int i = 0; i < sol.arraysize; i++) {\n            for (int j = 0; j < sol.arraysize; j++) {\n                int ui = sol.f(i, j);\n                if (ui > Y) Y = ui;\n            }\n        }\n        System.out.println(Y);\n    }\n}",
            "linesMatch": [
                {
                    "f1Lines": "26-51",
                    "f2Lines": "15-36"
                },
                {
                    "f1Lines": "1-7",
                    "f2Lines": "1-7"
                }
            ],
            "numLinesSimilar": 33,
            "similarFileName": "Mohammad_zaied-11924574",
            "similarPercentage": "65%"
        },
        {
            "code": "import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        int n = input.nextInt();\n        int[][] arr = new int[n][n];\n        int[] arr1 = new int[n * n];\n        int h = 0;\n\n        for (int i = 0; i < n; i++)\n            for (int j = 0; j < n; j++) {\n                arr[i][j] = arr1[h];\n                h++;\n            }\n\n        int max = Integer.MIN_VALUE;\n        for (int i = 0; i < n; i++)\n            for (int j = 0; j < n; j++) {\n                max = Math.max(max, f(i, j));\n            }\n\n        System.out.println(max);\n    }\n\n    static int f(int i, int j) {\n        // Your implementation of f function here\n        return 0;\n    }\n}",
            "linesMatch": [
                {
                    "f1Lines": "1-7",
                    "f2Lines": "1-7"
                }
            ],
            "numLinesSimilar": 7,
            "similarFileName": "Noor_Aldeen_Muneer_Barham_Abu_Shehadeh-11749582",
            "similarPercentage": "12%"
        }
    ],
    "code": "import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\n class Main {\n    int arraysize;\n    int[][] data;\n    int M = (int) Double.NEGATIVE_INFINITY;\n\n    Main() {\n        Scanner input = new Scanner(System.in);\n        arraysize = Integer.parseInt(input.nextLine());\n        data = new int[arraysize][arraysize];\n\n        for (int i = 0; i < arraysize; i++) {\n            String da = input.nextLine();\n            String[] qq = da.split(\",\");\n\n            for (int j = 0; j < qq.length; j++)\n                data[i][j] = Integer.parseInt(qq[j]);\n        }\n    }\n\n    int f(int i, int j) {\n        if (i == arraysize - 1 && j == arraysize - 1) return data[i][j];\n\n        int n1 = 0, n2 = 0;\n        if (j < arraysize && i < arraysize) {\n            n1 = data[i][j] + f(i, j + 1);\n            n2 = data[i][j] + f(i + 1, j);\n        }\n\n        if (n1 < n2) return n2;\n        else return n1;\n    }\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Main. */\n        Main sol = new Main();\n        int Y = sol.f(0, 0);\n\n        for (int i = 0; i < sol.arraysize; i++) {\n            for (int j = 0; j < sol.arraysize; j++) {\n                int ui = sol.f(i, j);\n                if (ui > Y) Y = ui;\n            }\n        }\n\n        System.out.println(Y);\n    }\n}",
    "fileName": "Momen_Hasan_Odeh-11923929",
    "numberOfLines": 53,
    "similarity": 62,
    "totalNumSimilarityLine": 33,
    "totalSimilarRange": [
        "1-7",
        "26-51"
    ]
}
        # uId = desired_object["fileName"].split("-")[-1]
        # sql = f"""
        #             SELECT submissionFileKey FROM student_submissions where
        #             studentUniversityNumber = '{uId}';
        #     """
        # cursor = execute_query(connection, sql)
        # sqlRes = fetch_results(cursor)
        # keyUid = sqlRes[0][0]
        # contentUid = get_file_content(keyUid)
        # desired_object["code"] = contentUid
        # # print(desired_object["fileName"].split("-")[-1])
        # for index,fileCNT in enumerate(desired_object["SimilarFiles"]):
        #     # print(fileCNT["similarFileName"].split("-")[-1])
        #     uId = fileCNT["similarFileName"].split("-")[-1]
        #     sql = f"""
        #                         SELECT submissionFileKey FROM student_submissions where
        #                         studentUniversityNumber = '{uId}';
        #                 """
        #     cursor = execute_query(connection, sql)
        #     sqlRes = fetch_results(cursor)
        #     keyUid = sqlRes[0][0]
        #     contentUid = get_file_content(keyUid)
        #     desired_object["SimilarFiles"][index]["code"] = contentUid
        return desired_object,200

    except Exception as e:
        return {"error": e}, 409

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