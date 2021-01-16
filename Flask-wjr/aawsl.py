from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'hello world'


@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        print(request.headers)
        print(request.form)
        print(request.form['name'])
        print(request.form.get('name'))
        print(request.form.getlist('name'))
        print(request.form.get('nickname', default='little apple'))
    return 'welcome'


if __name__ == '__main__':
    app.run(debug=True)
