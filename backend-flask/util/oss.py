import oss2
import os

ENDPOINT_BASE = "oss-cn-beijing.aliyuncs.com"

access_key_id = os.getenv('OSS_TEST_ACCESS_KEY_ID', 'LTAI4Fm9nzRnZCNHsTfQ6p26')
access_key_secret = os.getenv('OSS_TEST_ACCESS_KEY_SECRET', 'VnoqPouJtl9761NTTicdGFI8x3bfVE')
bucket_name = os.getenv('OSS_TEST_BUCKET', 'thesis-project')
endpoint = os.getenv('OSS_TEST_ENDPOINT', 'http://' + ENDPOINT_BASE)

class ObjectStorageService(object):
	def __init__(self):
		self.auth = oss2.Auth(access_key_id, access_key_secret)
		self.bucket = oss2.Bucket(self.auth, endpoint, bucket_name)

	def upload_oss_pics(self, upload_name, file_path):
		result =  self.bucket.put_object_from_file(upload_name, file_path)
		if result.status == 200:
			return "https://" + bucket_name + "." + ENDPOINT_BASE + "/" + upload_name


if __name__ == '__main__':
	u_name = ""
	f_path = ""
	print(ObjectStorageService().upload_oss_pics(u_name, f_path))
