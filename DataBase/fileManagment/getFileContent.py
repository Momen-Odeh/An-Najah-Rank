from AWS_SetUp import *
import os
from fileManagment.getFileExtention import get_file_extension
from FlaskSetUp import app
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
        app.logger.info(f"get file content: {data}")
        return data
    except Exception as e:
        app.logger.error(f"error in get file content: {e}")
        return e