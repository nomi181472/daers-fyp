import pandas as pd
import random
def cartesion_product(ww,age,chestlevel,abslevel,exerciseCategory):
  df = pd.DataFrame(columns=["age", "chestlevel", "abslevel", "ww", "exercisecategory"])
  for w in ww:
    for a in age:
      for cl in chestlevel:
        for al in abslevel:
          for ec in exerciseCategory:
            df = df.append(
              {"ww": w, "age": a, "chestlevel": cl, "abslevel": al, "exercisecategory": exerciseCategory[ec]},
              ignore_index=True)
  return df
def generate_code():
  ex = pd.read_csv("data/exercises2.csv", index_col=0)
  code = "en"
  exercise_name_dict = {}
  d = list(ex["exerciseName"])
  for i in range(len(d)):
    exercise_name_dict[d[i]] = f'{code} ' + str(i)
  return exercise_name_dict

exercises=pd.read_csv("data/exercises.csv",index_col=0)
exercises.drop("ID",axis=1)
age=["teen","adult","old"]
chestlevel=["1","2","3"]
abslevel=["1","2","3"]
ww=["poor","normal","good"]
exerciseCategory={'a':"abdominals",'t':"triceps","b":"biceps",'s':"shoulders","c":"chest","l":"legs","bk":"back","cl":"calves"}
source_code={"old":"o","adult":"ad","teen":"te","good":"g","normal":"n","poor":"p","3":"3","1":"1","2":"2"}
inv_exerciseCategory = {v: k for k, v in exerciseCategory.items()}
source_code.update(inv_exerciseCategory)
df=cartesion_product(ww,age,chestlevel,abslevel,exerciseCategory)
df.to_csv("data/datalabel.csv")
exercises=pd.read_csv("data/exercises2.csv",index_col=0)
exercise_name_dict=generate_code()
leveldict = {"1": "Beginner", "2": "Intermediate", "3": "Advanced"}
dataset = pd.DataFrame(columns=["source", "target"])
source = pd.DataFrame(columns=["source"])
print("exercise_name_dict",exercise_name_dict)
print("df",df)
for it in range(len(df)):
  cat = df["exercisecategory"][it]
  level = "1"
  if (cat == "chest"):
    level = df["chestlevel"][it]
  elif (cat == "abdominals"):
    level = df["abslevel"][it]
  else:
    level = df["ww"][it]
    if (level == "poor"):
      level = "1"
    elif (level == "normal"):
      level = "2"
    else:
      level = "3"
  level_pred = leveldict[level]
  condition = []
  stopping = []
  if level_pred == "Advanced":
    condition = ["Beginner", "Intermediate", "Advanced"]
    stopping = [1, 2, 2]
  elif (level_pred == "Intermediate"):
    condition = ["Beginner", "Intermediate"]
    stopping = [1, 3]
  elif (level_pred == "Beginner"):
    condition = ["Beginner"]
    stopping = [4]
  for mul in range(1):
    cond = False
    collected_exercises = ""
    counter = 0

    for count in range(len(condition)):
      cond = (exercises["level"] == condition[count])

      elements = exercises[(cond) & (exercises["exerciseCategory"] == cat)]["exerciseName"]
      elements = list(elements)
      elements_length = len(elements)-1
      index_history = []

      for i in range(stopping[count]):


        index = random.randint(0, elements_length)
        loopbreak = 0
        while (index in index_history):
          index = random.randint(0, elements_length)
          loopbreak += 1
          if (loopbreak > 5):
            index = 0
            break
        index_history.append(index)

        collected_exercises += " " + exercise_name_dict[elements[index]]
        counter += 1


    data = 0
    so = ""
    for da in list(df.iloc[it]):
      so = so + " " + source_code[da]
    src = {"source": so}
    data = {"source": so, "target": collected_exercises}
    print(f'iteration:{it}{data} ---counter: {counter}')
    # source= source.append(src,ignore_index=True)
    dataset = dataset.append(data, ignore_index=True)

dataset.to_csv("data/algorithmic_generated2.csv")