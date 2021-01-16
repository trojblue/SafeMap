from flask import Flask
from flask import jsonify
from flask import request, Response
import random
import time

app = Flask(__name__)


def random_str():
    data = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-"

    random.seed(time.time())

    # randomly choose data
    sa = []
    for i in range(8):
        sa.append(random.choice(data))
    salt = ''.join(sa)

    return salt


# response
def make_response():
    content = '{"result": "%s", "data": "%s"}' % (random_str(), random_str())
    resp = Response(content)
    resp.headers["Access-Control-Origin"] = '*'

    return resp


# http GET
@app.route("/query", methods=["GET"])
def query():
    print("///////////////////////////")
    return jsonify(
        username=random_str(),
        password=random_str()
    )


# http POST
@app.route("/update", methods=["POST"])
def update():
    return make_response()


# http delete
@app.route("/delete", methods=["DELETE"])
def delete():
    return make_response()


# http head
@app.route("/head", methods=["HEAD"])
def head():
    return make_response()


if __name__ == "__main__":
    app.run(debug=True)