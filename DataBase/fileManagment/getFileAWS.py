from AWS_SetUp import *

def get_file_from_AWS(key):
    try:
        presigned_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': S3_BUCKET, 'Key': key},
            ExpiresIn=86400
        )
        return presigned_url
    except Exception as e:
        return e