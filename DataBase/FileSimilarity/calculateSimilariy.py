import pandas as pd
import os
import shutil
from FileSimilarity.dataFunctions import *
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection
from AWS_SetUp import *
from fileManagment.getFileExtention import get_file_extension
from MOSS import moss
import json



def downloadSubmitionFileAWS(submitionFileName,submitionsKeys):
    os.makedirs(submitionFileName, exist_ok=True) #create directory
    for submiton in submitionsKeys:
        regId,name,key = submiton
        extention = get_file_extension(key)
        localFilePath = os.path.abspath(os.path.join(submitionFileName, f"{name}-{regId}.{extention}"))
        print(localFilePath)
        s3.download_file(S3_BUCKET, key, localFilePath)

def similarityDataByMOSS(basePath,filesName,challengeId):
    try:
        m = moss.Moss()
        os.makedirs("FileSimilarity/baseFile", exist_ok=True)
        # add base file
        sql = f""" SELECT challengeLanguage FROM challenges WHERE id = '{challengeId}'; """
        cursor = connection.cursor()
        cursor.execute(sql)
        result_lang = json.loads(cursor.fetchone()[0]) # [{language:"",content:"key",type:""}]
        # print("+++++++++++",result_lang,"++++++++++++++++")
        for lang in result_lang:
            localFilePath = os.path.abspath(os.path.join("FileSimilarity/baseFile", f"file.{get_file_extension(lang['content'])}"))
            # print("+++++++++++++++++++++++++++++++++", localFilePath, "+++++++++++++++++++++++++++++++++")
            s3.download_file(S3_BUCKET, lang['content'], localFilePath)
            m.addBaseFile(localFilePath)
        #
        for fileName in filesName:
            m.addFile(basePath+"/"+fileName)
        url = m.send(lambda file_path, display_name: print('*', end='', flush=True))
        print("Report URL: " + url)
        shutil.rmtree("FileSimilarity/baseFile")
        return url
    except Exception as e:
        print(e)

def getSimilarityURL(contestId, challengeId):
    sql = f"""
            SELECT ss.studentUniversityNumber, u.fullName as studentName, ss.submissionFileKey
            FROM `an-najah rank`.student_submissions ss
            JOIN `an-najah rank`.user u ON ss.studentUniversityNumber = u.universityNumber
            WHERE (ss.studentUniversityNumber, ss.submissionTime) IN (
                SELECT ss2.studentUniversityNumber, MAX(ss2.submissionTime) AS latest_submissionTime
                FROM `an-najah rank`.student_submissions ss2
                WHERE ss2.contestId = '{contestId}' AND ss2.challengeId = '{challengeId}'
                GROUP BY ss2.studentUniversityNumber
            ) AND ss.contestId = '{contestId}' AND ss.challengeId = '{challengeId}';
            """
    cursor = execute_query(connection, sql)
    submitionsKeys = fetch_results(cursor)

    submitionFileName = f"FileSimilarity/contest{contestId}-challenge{challengeId}"
    # *********************************************** download file ****************************************************
    downloadSubmitionFileAWS(submitionFileName,submitionsKeys)
    # ******************************************************************************************************************
    file_list = [f for f in os.listdir(submitionFileName) if os.path.isfile(os.path.join(submitionFileName, f))]
    # add files on moss generate similarity uri
    dataURL = similarityDataByMOSS(submitionFileName,file_list,challengeId)
    # ************************************************ remove directory ************************************************
    shutil.rmtree(submitionFileName) #remove directory with content
    # ******************************************************************************************************************
    return dataURL
def calculateSimilariy(contestId, challengeId):
    try:
        url = getSimilarityURL(contestId, challengeId)#"http://moss.stanford.edu/results/3/4528236255023"#
        similarityFiles = pd.read_html(url)
        response = similarityFiles[0].values
        filesNames = set()  # [uniqeFileNames,]
        similarityFilesData = []  # [[index,file1Name,similarity1,file2Name,similarity2,numLinesMatch,linesSimilar]
        for index, rowFile in enumerate(response):
            seprate1 = separatePersante(rowFile[0])
            seprate2 = separatePersante(rowFile[1])
            matchLines = pd.read_html(url + f"/match{index}-top.html")
            lines = []
            for line in matchLines[0].values:
                lines.append([line[0], line[2]])

            splitStr = seprate1[0].split("/")
            seprate1[0] = splitStr[len(splitStr) - 1].split(".")[0]
            splitStr = seprate2[0].split("/")
            seprate2[0] = splitStr[len(splitStr) - 1].split(".")[0]

            similarityFilesData.append([index, seprate1[0], seprate1[1], seprate2[0], seprate2[1], rowFile[2], lines])
            filesNames.add(seprate1[0])
            filesNames.add(seprate2[0])
        filesNames = list(filesNames)
        # *************************************************************
        resultFileSimilarity = []
        for name in filesNames:
            # print(name)
            SimilarFiles = []
            fileRange = []
            for row in similarityFilesData:
                if name in row:
                    # print("row", row)
                    dataObj = {}
                    if name == row[1]:  # as i need Left
                        # print("left")
                        dataObj["similarFileName"] = row[3]
                        dataObj["similarPercentage"] = row[2]
                        dataObj["numLinesSimilar"] = row[5]
                        dataObj["linesMatch"] = []
                        for simline in row[6]:
                            fileRange.append(simline[0])
                            dataObj["linesMatch"].append(
                                {
                                    "f1Lines": simline[0],
                                    "f2Lines": simline[1]
                                }
                            )
                    else:
                        # print("right")
                        dataObj["similarFileName"] = row[1]
                        dataObj["similarPercentage"] = row[4]
                        dataObj["numLinesSimilar"] = row[5]
                        dataObj["linesMatch"] = []
                        for simline in row[6]:
                            fileRange.append(simline[1])
                            dataObj["linesMatch"].append(
                                {
                                    "f1Lines": simline[1],
                                    "f2Lines": simline[0]
                                }
                            )

                    SimilarFiles.append(dataObj)
            resMerge = merge_ranges(fileRange)
            totalNumSimilarityLine = 0
            for rangeSimLine in resMerge:
                outSplit = rangeSimLine.split("-")
                totalNumSimilarityLine += (int(outSplit[1]) - int(outSplit[0])) + 1
            resultFileSimilarity.append(
                {
                    "fileName": name,
                    "totalSimilarRange": resMerge,
                    "totalNumSimilarityLine": totalNumSimilarityLine,
                    "SimilarFiles": SimilarFiles,
                }
            )

        return resultFileSimilarity
    except Exception as e:
        return None

