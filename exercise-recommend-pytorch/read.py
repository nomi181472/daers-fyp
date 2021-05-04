from torchtext.data import Field, TabularDataset, BucketIterator
import pandas as pd
import spacy
tokenize=lambda x:x.split()
# df=pd.DataFrame([["a","b"],["c","d"]],columns=["t","s"])
# df.to_csv("data/train.csv")
# df=pd.DataFrame([["a","b"],["c","d"]],columns=["t","s"])
# df.to_csv("data/test.csv")
source=Field(sequential=True,use_vocab=True,tokenize=tokenize,
           lower=True)
target=Field(sequential=True,use_vocab=True,tokenize=tokenize,
           lower=True)
field={"source":("s",source),"target":("t",target)}

train_data,test_data=TabularDataset.splits(
    path="data",
    train="sequence-to-sequence.csv",
    test="sequence-to-sequence.csv",
    format="csv",
    fields=field)
print(train_data[0].__dict__.keys())
print(train_data[0].__dict__.values())
print(test_data[0].__dict__.keys())
print(test_data[0].__dict__.values())


source.build_vocab(train_data,max_size=10000,min_freq=1)

target.build_vocab(test_data,max_size=10000,min_freq=1)

train_iterator,test_iterator=BucketIterator.splits((train_data,test_data),
                                                   batch_size=1,
                                                   device="cpu")
print(train_iterator)
for batch in train_iterator:
    print(batch.s)
    print(batch.t)
