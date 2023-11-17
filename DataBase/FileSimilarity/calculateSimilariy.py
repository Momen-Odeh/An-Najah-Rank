from FileSimilarity.dataFunctions import *

filesNames = ['submission/NoorAldeen.java',
              'submission/wwwww.java',
              'submission/momenMagic.java',
              'submission/momen.java',
              'submission/qqqqqqq.java',
              'submission/NoorAldeen-Magic.java'
              ]
similarityFilesData = [
    [0, 'submission/NoorAldeen.java', '70%', 'submission/wwwww.java', '97%', 31,
     [['22-40', '13-33'], ['1-10', '1-10']]],
    [1, 'submission/momenMagic.java', '52%', 'submission/NoorAldeen-Magic.java', '74%', 32,
     [['19-36', '24-40'], ['43-56', '6-18']]],
    [2, 'submission/momen.java', '35%', 'submission/qqqqqqq.java', '93%', 22, [['44-58', '8-22'], ['1-7', '1-7']]],
    [3, 'submission/momen.java', '12%', 'submission/momenMagic.java', '13%', 8, [['1-8', '2-9']]],
    [4, 'submission/wwwww.java', '16%', 'submission/qqqqqqq.java', '29%', 7, [['1-7', '1-7']]],
    [5, 'submission/momenMagic.java', '12%', 'submission/wwwww.java', '16%', 7, [['2-8', '1-7']]],
    [6, 'submission/momenMagic.java', '12%', 'submission/qqqqqqq.java', '29%', 7, [['2-8', '1-7']]],
    [7, 'submission/momenMagic.java', '12%', 'submission/NoorAldeen.java', '12%', 7, [['2-8', '1-7']]],
    [8, 'submission/momen.java', '10%', 'submission/wwwww.java', '16%', 7, [['1-7', '1-7']]],
    [9, 'submission/momen.java', '10%', 'submission/NoorAldeen.java', '12%', 7, [['1-7', '1-7']]],
    [10, 'submission/NoorAldeen.java', '12%', 'submission/qqqqqqq.java', '29%', 7, [['1-7', '1-7']]]
]
def calculateSimilariy():
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
        # print("qqqqqqqqqqqq", resMerge,"-------------------------------------------------")
        totalNumSimilarityLine = 0
        for rangeSimLine in resMerge:
            outSplit = rangeSimLine.split("-")
            totalNumSimilarityLine += (int(outSplit[1]) - int(outSplit[0])) + 1
        # print("totalNumSimilarityLine",totalNumSimilarityLine,"++++++++++++++++++++++++++++++++")
        resultFileSimilarity.append(
            {
                "fileName": name,
                "totalSimilarRange": resMerge,
                "totalNumSimilarityLine": totalNumSimilarityLine,
                "SimilarFiles": SimilarFiles,
            }
        )

    # print(resultFileSimilarity)
    return resultFileSimilarity
