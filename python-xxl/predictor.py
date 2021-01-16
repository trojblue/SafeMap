import flask
import csv
import heapq
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True



@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''



@app.route('/foo', methods=['POST'])
def foo():
    response = flask.jsonify({'result': request.json})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


app.run()
