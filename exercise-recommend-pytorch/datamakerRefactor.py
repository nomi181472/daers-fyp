import pandas as pd
import random

# Function to do a cartesian
# product of N sets

folder_path = "data"


class Data:
    def __init__(self):
        # region All Exercises
        self.chestlevel = ["1", "2", "3"]
        self.abslevel = ["1", "2", "3"]
        self.backLevel = ["1", "2", "3"]
        self.legslevel = ["1", "2", "3"]
        self.shoulderLevel = ["1", "2", "3"]
        # endregion
        # region User Information
        #self.age = ["teen", "adult", "old"]
        self.ww = ["poor", "normal", "good"]
        # endregion
        # region ExerciseRead
        self.exercises = pd.read_csv("data/exercises2.csv", index_col=0)
        self.exercises.drop("ID", axis=1)
        # endregion
        # region Information Mapper
        self.exerciseCategory = {'a': "abdominals", 't': "triceps", "b": "biceps", 's': "shoulders", "c": "chest",
                                 "l": "legs",
                                 "bk": "back", "cl": "calves"}
        self.source_code = {"old": "o", "adult": "ad", "teen": "te", "good": "g", "normal": "n", "poor": "p", "3": "3",
                            "1": "1",
                            "2": "2"}
        inv_exerciseCategory = {v: k for k, v in self.exerciseCategory.items()}
        self.source_code.update(inv_exerciseCategory)
        self.exercise_name_dict = {}
        self.leveldict = {"1": "Beginner", "2": "Intermediate", "3": "Advanced"}
        # endregion
        # region Dataset DataFrame
        self.dataset = pd.DataFrame(columns=["source", "target"])
        # dataset = source_to_target(self.exercise_name_dict, self.exercises)
        self.source = pd.DataFrame(columns=["source"])
        # endregion

    def generate_code(self, ):
        ex = self.exercises.copy()
        code = "en"
        d = list(ex["exerciseName"])
        for i in range(len(d)):
            self.exercise_name_dict[d[i]] = f'{code} ' + str(i)  # 1st run

    def takeCartesion(self):
        list_a = [self.ww,self.chestlevel, self.abslevel, self.backLevel, self.legslevel, self.shoulderLevel,
                  list(self.exerciseCategory.values())]
        n = len(list_a)
        self.df = self.Cartesian(list_a, n)

    def Cartesian(self, list_a, n):
        # result of cartesian product
        # of all the sets taken two at a time
        temp2 = list_a[0]

        df = pd.DataFrame(
            columns=[ #"age",
                     "chestlevel", "abslevel", "backlevel", "legslevel", "shoulderlevel", "ww",
                     "exercisecategory"])
        # do product of N sets
        for i in range(1, n):
            temp2 = self.cartesianProduct(temp2, list_a[i])
        print(len(temp2))
        for temp in temp2:
            #print(temp)
            df = df.append(
                {"ww": temp[0],
                  "chestlevel": temp[1], "abslevel": temp[2], "backlevel": temp[3],
                 "legslevel": temp[4], "shoulderlevel": temp[5],
                 "exercisecategory": temp[6], #"age": temp[1],
                },
                ignore_index=True)
        df.to_csv(f'{folder_path}/datalabel.csv')
        return df

    def cartesianProduct(self, set_a, set_b):
        result = []
        for i in range(0, len(set_a)):
            for j in range(0, len(set_b)):

                # for handling case having cartesian
                # prodct first time of two sets
                if type(set_a[i]) != list:
                    set_a[i] = [set_a[i]]

                # coping all the members
                # of set_a to temp
                temp = [num for num in set_a[i]]

                # add member of set_b to
                # temp to have cartesian product
                temp.append(set_b[j])
                result.append(temp)

        return result

    def source_to_target(self, ):
        pass
        # self.dataset = pd.DataFrame(columns=["source", "target"])
        # for name in exercises["exerciseName"]:
        #     data = {"source": name, "target": exercise_name_dict[name]}
        #     dataset = dataset.append(data, ignore_index=True)

    def GenerateData(self):
        for it in range(len(self.df)):
            # region Getting Level so that we can take that level use to generate data
            cat = self.df["exercisecategory"][it]
            level = "1"
            if (cat == "chest"):
                level = self.df["chestlevel"][it]
            elif (cat == "abdominals"):
                level = self.df["abslevel"][it]
            elif (cat == "back"):
                level = self.df["backlevel"][it]
            elif (cat == "legs"):
                level = self.df["legslevel"][it]
            elif (cat == "calves"):
                level = self.df["legslevel"][it]
            elif (cat == "shoulders"):
                level = self.df["shoulderlevel"][it]
            else:
                level = self.df["ww"][it]
                if (level == "poor"):
                    level = "1"
                elif (level == "normal"):
                    level = "2"
                else:
                    level = "3"
            level_pred = self.leveldict[level]
            # endregion
            # region Setting condition and stopping point which will help us during fetching data from DataFreame exercises
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
            # endregion
            # region collection exercises, mapping to encode in small information and then appending in database
            for mul in range(1):
                cond = False
                collected_exercises = ""
                counter = 0

                for count in range(len(condition)):
                    cond = (self.exercises["level"] == condition[count])

                    elements = self.exercises[(cond) & (self.exercises["exerciseCategory"] == cat)]["exerciseName"]

                    elements = list(elements)
                    elements_length = len(elements) - 1
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

                        collected_exercises += " " + self.exercise_name_dict[elements[index]]  # elements[index]  #
                        counter += 1
                so = ""
                for da in list(self.df.iloc[it]):
                    so = so + " " + self.source_code[da]
                data = {"source": so, "target": collected_exercises}
                self.dataset = self.dataset.append(data, ignore_index=True)
            # endregion
        self.dataset.to_csv(f'{folder_path}/algorithmic_generatedMappedCodeRefactorResult.csv')


exerciseData = Data()

exerciseData.generate_code()

exerciseData.takeCartesion()

exerciseData.GenerateData()
