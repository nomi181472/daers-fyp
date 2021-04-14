# using tensorboard
# ----------------------------------debug on pycharm
# 1prepare the data
# 2build the model
# 3train the model
# 4analyze the model result
import torch
import torchvision  # popular architecture and datasets
import torchvision.transforms as transforms
import torch.nn.functional as F
import matplotlib.pyplot as plt
import numpy as np
import timeit
from torch.utils.tensorboard import SummaryWriter
from itertools import product
from collections import namedtuple, OrderedDict


def get_corrected_predicted(pred, actual):
    return pred.argmax(dim=1).eq(actual).sum().item()


torch.set_printoptions(linewidth=120)
torch.set_grad_enabled(True)
# 1prepare the data
# extract the data(get the data from the source)
# transform the data (data into tensor forms)
# pytorch provide abstract class Dataset for it
train_set = torchvision.datasets.FashionMNIST("./data/FashionMNIST", train=True, download=True,
                                              transform=transforms.Compose([transforms.ToTensor()]))
train_set

# load the data (put over data into object for accessing)
train_loader = torch.utils.data.DataLoader(train_set, batch_size=100)


# 2build the model
# a) extend pytorch base class nn
class NeuralNetwork(torch.nn.Module):
    # b) define layers as class attributes
    def __init__(self, input_shape):
        super(NeuralNetwork, self).__init__()
        # So the in_channels in the beginning is 3 for images with 3 channels (colored images).
        # For images black and white it should be 1.
        # The out_channels is what convolution will produce so these are the number of filters.
        self.con1 = torch.nn.Conv2d(1, 6, kernel_size=(5, 5))
        self.con2 = torch.nn.Conv2d(6, 12, kernel_size=(5, 5))
        # The output of conv1 should be ((28-5) + 1) / 2 = 12x12 image
        # The output of conv2 should be ((12-5) + 1) / 2 = 4x4 image
        self.fc1 = torch.nn.Linear(12 * 4 * 4, 120)
        self.fc2 = torch.nn.Linear(120, 60)
        self.out = torch.nn.Linear(60, 10)

    # c) implement forward method
    def forward(self, x):
        # input layer
        x = x
        # first hidden conv layer
        x = self.con1(x)
        x = F.relu(x)
        x = F.max_pool2d(x, kernel_size=2, stride=2)
        # second hidden conv layer
        x = self.con2(x)
        x = F.relu(x)
        x = F.max_pool2d(x, kernel_size=2, stride=2)
        # 3rd hidden  linear layer
        x = x.reshape(-1, 12 * 4 * 4)
        x = self.fc1(x)
        x = F.relu(x)
        # 4rd hidden  linear layer
        x = self.fc2(x)
        x = F.relu(x)
        # 4rd hidden  linear layer
        x = self.out(x)
        # x=F.softmax(x,dim=1)
        return x

        return x

    def __repr__(self):
        return "My Neural Network\n" + super(NeuralNetwork, self).__repr__()


# [6,1,5,5] 6=no of filter 1) depth of channel which is being convolve) 5*5 filter height and width
# no of columns=no of rows
# training with gpu
# lr=0.01
# batch_size=100
class Manager():
    def __init__(self, ):
        self.epoch_count = 0
        self.epoch_loss = 0
        self.epoch_num_correct = 0
        self.epoch_start_time = None

        self.run_params = None
        self.run_count = 0
        self.run_data = []
        self.run_start_time = None

        self.network = None
        self.loader = None
        self.tb = None

    def begin_run(self, run, network, loader):
        self.run_start_time=time.time()

        self.run_params=run
        self.run_count +=1

        self.network=network
        self.loader=loader
        self.tb=SummaryWriter(comment=f'--{run}')

        images,labels=next(iter(self.loader))
        grid= torchvision.utils.make_grid(images)
        self.tb.add_image("images",grid)
        self.tb.add_graph(self.network,images)

    def end_run(self):
        self.tb.close()
        self.epoch_count=0

    def begin_epoch(self):
        self.epoch_start_time=time.time()
        self.epoch_count += 1
        self.epoch_loss=0
        self.epoch_num_correct=0

    def end_epoch(self):

        epoch_duration=time.time()-self.epoch_start_time
        run_duration= time.time()=self.run_start_time

        loss=self.epoch_loss/len(self.loader.dataset)
        accuracy  =self.epoch_num_correct / len(self.loader.dataset)

        self.tb.add_scalar("Loss",loss,self.epoch_count)
        self.tb.add_scalar("Accuracy",accuracy,self.epoch_count)

        for name, weight in self.network.named_parameters():
            tb.add_histogram(name, weight, i)

        result=OrderedDict()
        result["run"] = self.run_count
        result["epoch"] = self.epoch_count
        result["loss"] = loss
        result["accuracy"] = accuracy
        result["run_duration"] = run_duration

        for k,v in self.run_params.asdict().items():
            result[k]=v
        self.run_data.append(result)
        df=pd.DataFrame.from_dict(self.run_data,orient="columns")


        clear_output(wait=True)
        display(df)

    def track_loss(self,loss):
        self.epoch_loss += loss.item()* self.loader.batch_size
    def track_num_correct(self,preds,labels):
        self.epoch_num_correct += self._get_num_correct(preds, )
    @torch.no_grad()
    def get_corrected_predicted(self,pred, actual):
        return pred.argmax(dim=1).eq(actual).sum().item()
    def save(self,fileName):
        pd.DataFrame.from_dict(self.run_data,orient).to_csv(f"{fileName}.csv")
        with open(f"{fileName}.json",'w',encoding="utf-8") as f:
            json.dump(self.run_data,f,ensure_ascii=False,indent=4)










parameters = dict(
    lr=[0.1, 0.01],
    batch_size=[10, 100, 1000],

)


class RunBuilder():
    @staticmethod
    def get_runs(params):
        param_dic = OrderedDict(params)
        Run = namedtuple("Run", param_dic.keys())
        run_list = [Run(*v) for v in product(*param_dic.values())]
        print(run_list)
        return run_list


for run in RunBuilder.get_runs(parameters):
    print(run)
    comment = f'{run}'
    tb = SummaryWriter(comment=comment)
    model = NeuralNetwork(1)
    optimize = torch.optim.Adam(model.parameters(), lr=lr)
    model = model.cuda()
    loader = torch.utils.data.DataLoader(train_set, batch_size=batch_size)
    epochs = 5

    start = timeit.default_timer()
    for i in range(epochs):
        total_loss = 0
        total_correct = 0
        for images, labels in loader:
            predicts = model(images.cuda(), )
            loss_c = F.cross_entropy(predicts.cuda(), labels.cuda())
            optimize.zero_grad()
            loss_c.backward()
            optimize.step()
            total_correct += get_corrected_predicted(predicts.cuda(), labels.cuda())
            total_loss += loss_c.item() * batch_size
        tb.add_scalar('Loss', total_loss, i)
        tb.add_scalar('Number Correct', total_correct, i)
        tb.add_scalar('Accuracy', total_correct / len(train_set), i)

        # tb.add_histogram('conv1.bias', model.con1.bias, i)
        # tb.add_histogram('conv1.weight', model.con1.weight, i)
        # tb.add_histogram('conv1.weight.grad',model.con1.weight.grad,i)
        for name, weight in network.named_parameters():
            tb.add_histogram(name, weight, i)
            # print(type(weight.grad))
            # tb.add_histogram(f"{name}.grad",weight.grad,i)
        print("epochs", i, "total Correct:", total_correct, "total loss", total_loss)

    stop = timeit.default_timer()
    tb.close()
    print('Time: ', stop - start)