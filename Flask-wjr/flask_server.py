from flask import Flask, jsonify, url_for
from flask import request

app = Flask(__name__)


@app.route('/login', methods=['POST'])
def login():
    print(request.get_json())
    json_data = {'success': 'true'}
    url_for('static', filename='style.css')
    return jsonify(json_data)


if __name__ == '__main__':
    app.run()
