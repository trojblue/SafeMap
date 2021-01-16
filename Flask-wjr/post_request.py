import urllib.request
import json


def post():
    url = "http://127.0.0.1:5000/login"
    post_dict = {
        'username': 'test',
        'password': '123',
        'login': 'I\'m login'
    }
    headers = {'Content-Type': 'application/json'}
    request = urllib.request.Request(url, headers=headers, data=bytes(json.dumps(post_dict), 'utf8'))
    request.get_method = lambda: "POST"
    response = urllib.request.urlopen(request)
    print(response.read())


if __name__ == '__main__':
    post()
