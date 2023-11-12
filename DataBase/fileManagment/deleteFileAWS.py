from AWS_SetUp import *

def delete_file_from_AWS(key):
    try:
        response = s3.delete_object(Bucket=S3_BUCKET, Key=key)
        return True
    except Exception as e:
        return e