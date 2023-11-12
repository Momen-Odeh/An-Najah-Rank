from flask import request, jsonify
import boto3
from botocore.exceptions import NoCredentialsError
from FlaskSetUp import app

S3_BUCKET = "an-najah-rank-cloud"
S3_ACCESS_KEY = "AKIA4MRLLFXGSTUNLV5R"
S3_SECRET_KEY = "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"

import uuid
import traceback

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        file = request.files['file']
        #unique_filename = f"images/{str(uuid.uuid4())}.{file.filename.split('.')[-1]}"
        s3 = boto3.client('s3', aws_access_key_id=S3_ACCESS_KEY, aws_secret_access_key=S3_SECRET_KEY)
        #s3.upload_fileobj(file, S3_BUCKET, unique_filename)

        presigned_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': S3_BUCKET, 'Key': 'images/647007a5-6064-45ea-9ac5-de7db9e95965.jpeg'},
            ExpiresIn=86400    # Set the expiration time to 1 hour (or your desired duration)
        )
        return jsonify({'url': presigned_url})

    except NoCredentialsError as e:
        traceback.print_exc()
        return jsonify({'error': f'AWS credentials error: {str(e)}'}), 500


