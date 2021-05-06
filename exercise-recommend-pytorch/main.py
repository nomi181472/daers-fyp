import pandas as pd
def replacer(data,old,new):
    names=[]
    for strr in data:
        names.append(strr.replace(old, new))
    return names
exercises=pd.read_csv("data/exercises.csv",index_col=0,)
list_=replacer(exercises["exerciseName"],"-"," ")
exercises["exerciseName"]=list_
list_=replacer(exercises["exerciseName"],"w/"," ")
exercises["exerciseName"]=list_
list_=replacer(exercises["exerciseCategory"],"-"," ")
exercises["exerciseCategory"]=list_

list_=replacer(exercises["exerciseCategory"],"."," ")
exercises["exerciseCategory"]=list_

list_=replacer(exercises["exerciseCategory"],"/"," ")
exercises["exerciseCategory"]=list_
exercises["exerciseCategory"]=["ec"+str(i) for i in range(len(exercises))]
exercises["exerciseName"]=["en"+str(i) for i in range(len(exercises))]
def to_remove(data,removed_elements):
    for keys,item in data.items():
        for i in range(len(removed_elements)):
            old,new=removed_elements[i]
            print(f'{old}/{new}')
            data[keys]=replacer(data[keys],old,new)
    return data


to_remove
def read_csv(path,columns):
  try:
    return pd.read_csv(path,index_col=0)
  except Exception as e:
    print("except:",e)
    df=pd.DataFrame(columns=columns)
    df.to_csv(path,columns=columns)
    return df
def add(df,data,drive_path):
  df=df.append(data,ignore_index=True)
  df.to_csv(path)
  return df
path="C:/Users/noman/Daers-Backened/exercise-recommend-pytorch/data/sequence-to-sequence4.csv"
df=read_csv(path,columns=["source","target"]) 
for i in range(len(exercises)):
    source=exercises["exerciseCategory"][i]
    target= exercises["exerciseName"][i]
    df=add(df,{"source":source,"target":target},path)
    




