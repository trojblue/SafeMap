import requests

data = {'file': open('/test.doc', 'rb')}
rr = requests.post('http://xxx.xx.xxx.x:5000/index', files=data)
