from AWS_SetUp import *
import os
from fileManagment.getFileExtention import get_file_extension
def get_file_content(key):
    try:
        extention = get_file_extension(key)
        print(extention)
        localFilePath = os.path.abspath(os.path.join("fileManagment/downloadedfile", f"file.{extention}"))
        print(localFilePath)
        s3.download_file(S3_BUCKET, key, localFilePath)
        with open(localFilePath, 'r') as file:
            data = file.read()
        os.remove(localFilePath)
        return data
    except Exception as e:
        return e