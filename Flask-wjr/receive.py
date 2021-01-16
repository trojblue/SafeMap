from run_oa_con import extract_single
from flask import Flask, request
import json
import os

app = Flask(__name__)


@app.route('/index', methods=['POST'])
def index():
    ff = request.files['file']
    save_path = './static'
    ff.save(os.path.join(save_path, ff.filename))
    try:
        dic, state = extract_single(os.path.join(save_path, ff.filename))
    except Exception as e:
        print(e)
        dic, state = {}, 0
    res = json.dumps({'data': dic, 'success': state}, ensure_ascii=False)
    return res


if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')
