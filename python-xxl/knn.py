import json
import numpy as np
from sklearn.neighbors import KNeighborsClassifier

GEOJSON = './data/toronto.geojson'

def get_data():
    """读取geoJSON, 输出numpy array
    """
    with open(GEOJSON) as f:
        data = json.load(f)

    Xtrain_all, Ttrain_all = None, None

    for feature in data['features']:
        coord = (feature['geometry']['coordinates'])
        area = (feature['properties']['AREA_S_CD'])

        if Xtrain_all is None:
            Xtrain_all = np.array(coord[0])
            Ttrain_all = np.full(Xtrain_all.shape[0], fill_value=area)
        else:
            Xtrain = np.array(coord[0])
            Ttrain = np.full(Xtrain.shape[0], fill_value=area)

            Xtrain_all = np.concatenate((Xtrain_all, Xtrain), axis=0)
            Ttrain_all = np.concatenate((Ttrain_all, Ttrain), axis=0)

    return Xtrain_all, Ttrain_all


def get_community(clf, coords):
    """clf: classifier
    coords: (x, y)
    return: community(string)
    """
    prediction = clf.predict([[coords[0], coords[1]]])
    str_form = prediction[0].item()

    return str_form

def get_community_auto(coords):
    """单次, 重新加载数据, 稍微慢一点"""
    c = coords
    if isinstance(coords[0], str):
        c=(float(coords[0]), float(coords[1]))

    Xtrain, Ttrain = get_data()
    k=21    # 达到99.99%置信度的最小值; k越小速度越快
    clf = KNeighborsClassifier(k)
    clf.fit(Xtrain, Ttrain)
    return get_community(clf, c)


if __name__ == '__main__':
    # Xtrain:(n, 2)array   Ttrain:[str]
    Xtrain, Ttrain = get_data()

    k=21    # 达到99.99%置信度的最小值; k越小速度越快
    clf = KNeighborsClassifier(k)
    clf.fit(Xtrain, Ttrain)

    pred = get_community(clf, (-79.4, 43.7))
    print(pred)

