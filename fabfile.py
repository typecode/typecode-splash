import os

from fabric.api import *
from fabric.contrib import *

from boto.s3.connection import S3Connection


if not hasattr(env, 'user'):
    env.user = 'ubuntu'

if not hasattr(env, 'app_name'):
    env.app_name = 'dev.typecode.com'

if not hasattr(env, 'aws_id'):
    env.aws_id = None

if not hasattr(env, 'aws_key'):
    env.aws_key = None

if not hasattr(env, 'aws_bucket'):
    env.aws_bucket = None

if not hasattr(env, 'build_number'):
    env.build_number = None

s3_conn = S3Connection(aws_access_key_id=env.aws_id, aws_secret_access_key=env.aws_key)
s3_headers = {'x-amz-acl': 'public-read'}


def upload_www_to_s3():
    bucket = s3_conn.create_bucket(env.aws_bucket)

    namelist = []
    for root, dirs, files in os.walk('./www'):
        if files:
            path = os.path.relpath(root, 'www')
            namelist += [os.path.normpath(os.path.join(path, f)) for f in files]

    print 'Uploading:  '
    for name in namelist:
        my_path = os.path.join('./www', name)
        print '  ' + my_path
        content = open(my_path)
        key = bucket.new_key(name)
        key.set_contents_from_file(content, s3_headers)
        content.close()


def deploy():
    if env.aws_bucket:
        upload_www_to_s3()
