import boto3
from botocore.client import Config

S3_BUCKET = "an-najah-rank-cloud"
S3_ACCESS_KEY = "AKIA4MRLLFXGSTUNLV5R"
S3_SECRET_KEY = "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"
AWS_REGION = "eu-central-1"
s3 = boto3.client('s3', aws_access_key_id=S3_ACCESS_KEY, aws_secret_access_key=S3_SECRET_KEY,
                      config=Config(signature_version='s3v4'),
                      region_name=AWS_REGION)