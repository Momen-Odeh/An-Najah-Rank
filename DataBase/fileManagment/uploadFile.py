from flask import request, jsonify
from botocore.exceptions import NoCredentialsError
import uuid
import traceback
from AWS_SetUp import *

def upload_file(file, baseUrl, filePath = None):
    try:
        # file = request.files['file']
        key = f"{baseUrl}/{str(uuid.uuid4())}.{file.filename.split('.')[-1] if not filePath else filePath.split('.')[-1]}"
        s3.upload_fileobj(file, S3_BUCKET, key)
        return key

    except NoCredentialsError as e:
        traceback.print_exc()
        print(e)
        return e