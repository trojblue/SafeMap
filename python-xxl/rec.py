import csv
import math
import knn

HOSPITALS = "./data/all_hospitals_in_toronto.csv"
CASES = "./data/covid_cases_total.csv"
COMMUNITY = "./data/covid_neighborhood_data.csv"

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
        val = i.values()
        if id in i.values():
            return i

    return None





if __name__ == '__main__':


    a = (-79.377, 43.667)
    b = (-79.4, 43.7)

    hospital_dict = get_hospital_list(a)
    hospital_list_by_dist = sorted(hospital_dict, key=lambda k: k['dist']) # 距离从少到大排列

    first_5 = hospital_list_by_dist[:5]
    first_5_coords = [(h['X'], h['Y'])for h in first_5]
    site = knn.get_community_auto(first_5_coords[0])

    com = get_community_list()

    community_json = get_community_by_id('074')


    print("D")









