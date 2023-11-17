import os
import json
from fileManagment.uploadFile import upload_file
from  fileManagment.getFileContent import get_file_content
def storeSimilarityAWS(fileContent,contestId,challengeId):
    fullPath = os.path.abspath(os.path.join("FileSimilarity/similarity", f"file.json"))
    print(f"Full path: {fullPath}")
    with open(fullPath, "w", encoding="utf-8") as file:
        file.write(json.dumps(fileContent))
    with open(fullPath, 'rb') as file:
        fileKey = upload_file(file, f"similarity/{contestId}_{challengeId}", fullPath)
    return fileKey

def getFileSimilarityAWS(key):
    strContent = get_file_content(key)
    return json.loads(strContent)
