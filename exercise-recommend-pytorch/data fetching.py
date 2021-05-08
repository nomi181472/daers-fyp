import pandas as pd


def replacer(data, old, new):
    names = []
    for strr in data:
        names.append(strr.replace(old, new))
    return names


import os

a = os.path.abspath("C:\\Users\\noman\\Daers-Backened\\exercise-recommend-pytorch\\data\\exercises.csv")
exercises = pd.read_csv(a, index_col=0, )
list_ = replacer(exercises["exerciseName"], "-", " ")
exercises["exerciseName"] = list_
list_ = replacer(exercises["exerciseName"], "w/", " ")
exercises["exerciseName"] = list_

list_ = replacer(exercises["exerciseCategory"], "-", " ")
exercises["exerciseCategory"] = list_

list_ = replacer(exercises["exerciseCategory"], ".", " ")
exercises["exerciseCategory"] = list_

list_ = replacer(exercises["exerciseCategory"], "/", " ")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Abdominals   Lower", "abdominals")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Abdominals   Obliques", "abdominals")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Abdominals   Upper", "abdominals")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Abdominals   Total", "abdominals")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Back   Latissimus Dorsi", "back")
exercises["exerciseCategory"] = list_

list_ = replacer(exercises["exerciseCategory"], "Back   Lat Dorsi Rhomboids", "back")
exercises["exerciseCategory"] = list_

list_ = replacer(exercises["exerciseCategory"], "Biceps", "biceps")
exercises["exerciseCategory"] = list_

list_ = replacer(exercises["exerciseCategory"], "Calves   Gastrocnemius", "calves")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Calves   Soleus", "calves")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Chest   Pectoralis", "chest")
exercises["exerciseCategory"] = list_

list_ = replacer(exercises["exerciseCategory"], "Legs   Hamstrings", "legs")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Legs   Quadriceps", "legs")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Lower Back   Erector Spinae", "back")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Shoulders   Delts Traps", "shoulders")
exercises["exerciseCategory"] = list_
list_ = replacer(exercises["exerciseCategory"], "Shoulders   Rotator Cuff", "shoulders")
exercises["exerciseCategory"] = list_

list_ = replacer(exercises["exerciseCategory"], "Triceps", "triceps")
exercises["exerciseCategory"] = list_

exercises["exerciseCategory"] = ["ec " + str(i) for i in range(len(exercises))]
exercises["exerciseName"] = ["en " + str(i) for i in range(len(exercises))]

a = os.path.abspath("C:\\Users\\noman\\Daers-Backened\\exercise-recommend-pytorch\\data\\exercises_exmo.csv")
exercises.to_csv(a)

for i in range(len(exercises["level"])):
    if (exercises["level"][i] == "Advanced"):
        exercises["level"][i] = 3
    elif (exercises["level"][i] == "Intermediate"):
        exercises["level"][i] = 2
    else:
        exercises["level"][i] = 1


def to_remove(data, removed_elements):
    for keys, item in data.items():
        for i in range(len(removed_elements)):
            old, new = removed_elements[i]
            print(f'{old}/{new}')
            data[keys] = replacer(data[keys], old, new)
    return data


to_remove


def read_csv(path, columns):
    try:
        return pd.read_csv(path, index_col=0)
    except Exception as e:
        print("except:", e)
        df = pd.DataFrame(columns=columns)
        df.to_csv(path, columns=columns)
        return df


def add(df, data, drive_path):
    df = df.append(data, ignore_index=True)
    df.to_csv(path)
    return df


path = "C:/Users/noman/Daers-Backened/exercise-recommend-pytorch/data/sequence-to-sequence5.csv"
df = read_csv(path, columns=["source", "target"])
for i in range(len(exercises)):
    source = exercises["exerciseCategory"][i]
    target = exercises["exerciseName"][i]
    df = add(df, {"source": source, "target": target}, path)





