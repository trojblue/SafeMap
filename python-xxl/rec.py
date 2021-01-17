import csv
import math
import knn, flask
from flask import request, jsonify


HOSPITALS = "./data/all_hospitals_in_toronto.csv"
CASES = "./data/covid_cases_total.csv"
COMMUNITY = "./data/covid_neighborhood_data.csv"
ASSESSMENT = "./data/assessment_center_locations_utf8.csv"


class  communityNotFoundError(Exception):
    pass

def get_assessment_list(coords):
    reader = csv.DictReader(open(ASSESSMENT, 'rt', encoding="utf8"))
    dict_list = []
    for line in reader:
        if not line['longitude']:
            continue
        try:
            curr_coord = (float(line['longitude']), float(line['latitude']))   #这里和get_hospital_list不一样
            curr_dist = math.dist(curr_coord, coords)
            line['dist'] = curr_dist
            line['X'] = curr_coord[0]
            line['Y'] = curr_coord[1]
            dict_list.append(line)
            dict_list.append(line)
        except ValueError:
            continue
    return dict_list

def get_hospital_list(coords):
    """coords: (x, y)
    return:[Dict(json)]
    """
    reader = csv.DictReader(open(HOSPITALS, 'rt', encoding="utf8"))
    dict_list = []
    for line in reader:
        x, y = float(line['\ufeffX']), float(line['Y'])
        curr_dist = math.dist((x,y), coords)
        line['dist'] = curr_dist

        line['X']=str(x) #修复开头的乱码
        # line.pop('\ufeffX', None)

        dict_list.append(line)
    return dict_list

def get_cases_list(coords):
    """coords: (x, y)
    return:[Dict(json)]
    """
    reader = csv.DictReader(open(CASES, 'rt', encoding="utf8"))
    dict_list = []
    for line in reader:
        curr_coord = (float(line['X']), float(line['Y']))   #这里和get_hospital_list不一样
        curr_dist = math.dist(curr_coord, coords)
        line['dist'] = curr_dist
        dict_list.append(line)
    return dict_list


def get_community_list():
    reader = csv.DictReader(open(COMMUNITY, 'rt', encoding="utf8"))
    dict_list = []
    for line in reader:
        dict_list.append(line)
    return dict_list

def get_community_by_id(id:str):
    """输入id, 输出community json
    community的csv不大, 所以直接重复读取了
    """
    com = get_community_list()

    for i in com:
        if id in i.values():
            return i

    return None

def get_community(com_id, com_list):
    curr_community = None  # 找community json
    for com in com_list:
        if com['Neighbourhood ID'] == com_id:
            curr_community = com
            break
    if not curr_community:
        raise communityNotFoundError
    return curr_community


def get_infection_rate_list(lst_sorted, count):
    """helper; 距离最近count个医院添加感染率信息
    lst:sorted: 按距离从小到大排列的所有医院
    """
    com_list = get_community_list()
    rate_basis = lst_sorted[:count]

    clf = knn.get_classifier()
    for base in rate_basis:
        coords = (base['X'], base['Y'])
        com_id = knn.get_community(clf, coords)  # 三位数str
        base['community'] = com_id
        curr_community = get_community(com_id, com_list)

        base['infection_rate'] = curr_community['Rate per 100,000 people']
    return rate_basis


def get_recommend(coord):
    """返回List[[json],[json],[json]]
    对应最短路径, 最短路径walk-in, 感染率最低
    """
    response = []
    lst = get_assessment_list(coord)
    lst_sorted = sorted(lst, key=lambda k: k['dist']) # 距离从少到大排列
    response.append(lst_sorted[:3])

    walk_ins = []   # 最短路径walk-in
    for i in lst_sorted:
        if i.get('walk_ins', None).lower() == 'yes' and len(walk_ins) < 3:
            walk_ins.append(i)
    response.append(walk_ins)

    rate_basis = get_infection_rate_list(lst_sorted, count=20) # 距离最近20个医院添加感染率信息
    rate_lst_sorted = sorted(rate_basis, key=lambda k: k['infection_rate'])
    response.append(rate_lst_sorted[:3])

    return response

def run_flask_server():
    app = flask.Flask(__name__)
    app.config["DEBUG"] = True

    @app.route('/recommend', methods=['POST'])
    def recommend():
        x, y = request.json['X'], request.json['Y']
        recommends = get_recommend((float(x), float(y)))

        response = flask.jsonify({'result': {
            'nearest':recommends[0],
            'nearest_walk_in':recommends[1],
            'nearest_safest':recommends[2]
        }})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    app.run()



if __name__ == '__main__':

    print("flask server running...")
    run_flask_server()









