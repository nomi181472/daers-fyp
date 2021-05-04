import torch
import torch.nn as nn
import torchvision #popular architecture and datasets
import torchvision.transforms as transforms
import pandas as pd
import timeit
from torch.utils.tensorboard import SummaryWriter
import os
from skimage import io
import cv2

def get_corrected_predicted(pred,actual):
  return pred.argmax(dim=1).eq(actual).sum().item()

device=torch.device("cuda" if torch.cuda.is_available() else "cpu")

torch.set_printoptions(linewidth=120)
torch.set_grad_enabled(True)
class dataset(torch.utils.data.Dataset):
  def __init__(self,csv_file,root_dir,transform=None):
      self.file=pd.read_csv(csv_file)
      self.tranform=transform
      self.root_dir=root_dir
      self.train_set= torchvision.datasets.FashionMNIST("./data/FashionMNIST",train=True,download=True,transform=transforms.Compose([transforms.ToTensor()]))
      self.sample=len(self.train_set)

  def __getitem__(self,index):
      image_path=os.path.join(self.root_dir,self.file.iloc[index,0])
      image=io.imread(image_path)
      image=cv2.resize(image,(229,229))
      y_label=torch.tensor(self.file.iloc[index,1])
      if self.tranform:
          image=self.tranform(image)
      return [image,y_label]

  def __len__(self):
    return len(self.file)
batch_size=16
epochs=10
learning_rate=0.01
seed=10
torch.manual_seed(10)
mydataset=dataset("data_annotated.csv","",transform=torchvision.transforms.ToTensor())
tr,te =torch.utils.data.random_split(mydataset,[90,7])
tr_loader=torch.utils.data.DataLoader(dataset=tr,batch_size=batch_size,shuffle=True)
te_loader=torch.utils.data.DataLoader(dataset=te,batch_size=batch_size,shuffle=True)
tb = SummaryWriter()
model=torchvision.models.googlenet(pretrained=True)
model=model.to(device=device)

optimize=torch.optim.Adam(model.parameters(),lr=learning_rate)
criterion=nn.CrossEntropyLoss()
start = timeit.default_timer()
for i in range(epochs):
    total_loss = 0
    total_correct = 0

    for images, labels in tr_loader:
        images=images.to(device=device)
        labels=labels.to(device=device)
        #forward pass
        predicts = model(images )
        loss_c = criterion(predicts, labels)
        #backpropagation
        optimize.zero_grad()
        loss_c.backward()
        #gradient descent
        optimize.step()
        total_correct += get_corrected_predicted(predicts.cpu(), labels.cpu())
        total_loss += loss_c.item()
    tb.add_scalar('Loss', total_loss, i)
    print(total_loss)
    tb.add_scalar('Number Correct', total_correct, i)
    print(total_correct)
    tb.add_scalar('Accuracy', total_correct / len(tr), i)
    print(total_correct / len(tr),i)
    print("Epochs", i, "Total Correct:", total_correct, "Total loss", total_loss, 'Accuracy',
          total_correct / len(tr), )

stop = timeit.default_timer()
tb.close()
print('Time: ', stop - start)
def check_accuracy(tloader,model):
    num_correct=0;
    num_samples=0
    model.eval()
    with torch.no_grad():
        for x,y in tloader:
            score=model(x)
            _,predictions=score.max(1)
            num_correct +=(predictions==y).sum()
            num_samples+=predictions.size(0)
        print(f'got {num_correct}/{num_samples} with accuracy'
              f'{float(num_correct)/float(num_samples)}')
    model.train()

print('trining')
check_accuracy(tr_loader,model)
print("testing")
check_accuracy(te_loader,model)




