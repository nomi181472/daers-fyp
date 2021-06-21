import torch
import torchvision #popular architecture and datasets
device=torch.device("cuda" if torch.cuda.is_available() else "cpu")
class dataset(torch.utils.data.Dataset):
  def __init__(self,transform=None,direct_path=None,image=None):
      self.transform=transform
      self.image=image
  def __getitem__(self,index):

    if self.transform:
        self.image=self.transform(self.image)
    return self.image
  def __len__(self):
      return 1
def testabs(url,image,abs_weights):

    data = dataset(transform=torchvision.transforms.ToTensor(), direct_path=url,image=image)
    tr_loader = torch.utils.data.DataLoader(dataset=data, batch_size=1, shuffle=True)
    model = torchvision.models.googlenet(pretrained=True)
    model.load_state_dict(torch.load(abs_weights,
                                     map_location=torch.device("cpu")), )
    model = model.to(device=device)
    model.eval()
    predictions = 1
    for images in tr_loader:
        images = images.to(device=device)
        predicts = model(images)
        temp,predictions=predicts.max(1)
    return predictions[0]
def testchest( url,image,chest_weights):
    data = dataset(transform=torchvision.transforms.ToTensor(), direct_path=url, image=image)
    tr_loader = torch.utils.data.DataLoader(dataset=data, batch_size=1, shuffle=True)
    model = torchvision.models.googlenet(pretrained=True)
    model.load_state_dict(torch.load(chest_weights,
                                     map_location=torch.device("cpu")), )
    model.eval()
    predictions = 1
    for images in tr_loader:
        images = images.to(device=device)
        predicts = model(images)
        temp, predictions = predicts.max(1)
    return predictions[0]
def testshoulder( url,image,shoulder_weights):
    data = dataset(transform=torchvision.transforms.ToTensor(), direct_path=url, image=image)
    tr_loader = torch.utils.data.DataLoader(dataset=data, batch_size=1, shuffle=True)
    model = torchvision.models.googlenet(pretrained=True)
    model.load_state_dict(torch.load(shoulder_weights,
                                     map_location=torch.device("cpu")), )
    model.eval()
    predictions = 1
    for images in tr_loader:
        images = images.to(device=device)
        predicts = model(images)
        temp, predictions = predicts.max(1)
    return predictions[0]
def testthigh( url,image,thigh_weights):
    data = dataset(transform=torchvision.transforms.ToTensor(), direct_path=url, image=image)
    tr_loader = torch.utils.data.DataLoader(dataset=data, batch_size=1, shuffle=True)
    model = torchvision.models.googlenet(pretrained=True)
    model.load_state_dict(torch.load(thigh_weights,
                                     map_location=torch.device("cpu")), )
    model.eval()
    predictions = 1
    for images in tr_loader:
        images = images.to(device=device)
        predicts = model(images)
        temp, predictions = predicts.max(1)
    return predictions[0]
def testbiceps( url,image,biceps_weights):
    data = dataset(transform=torchvision.transforms.ToTensor(), direct_path=url, image=image)
    tr_loader = torch.utils.data.DataLoader(dataset=data, batch_size=1, shuffle=True)
    model = torchvision.models.googlenet(pretrained=True)
    model.load_state_dict(torch.load(biceps_weights,
                                     map_location=torch.device("cpu")), )
    model.eval()
    predictions = 1
    for images in tr_loader:
        images = images.to(device=device)
        predicts = model(images)
        temp, predictions = predicts.max(1)
    return predictions[0]














# import torch
# import torchvision #popular architecture and datasets
# from torch.utils.tensorboard import SummaryWriter
# device=torch.device("cuda" if torch.cuda.is_available() else "cpu")
# class dataset(torch.utils.data.Dataset):
#   def __init__(self,transform=None,direct_path=None,image=None):
#       self.transform=transform
#       self.image=image
#   def __getitem__(self,index):
#
#     if self.transform:
#         self.image=self.transform(self.image)
#     return self.image
#   def __len__(self):
#       return 1
# def testabs(url,image):
#
#     data = dataset(transform=torchvision.transforms.ToTensor(), direct_path=url,image=image)
#     tr_loader = torch.utils.data.DataLoader(dataset=data, batch_size=1, shuffle=True)
#     model = torchvision.models.googlenet(pretrained=True)
#     model.load_state_dict(torch.load("weights/googlenetabs.pth",
#                                      map_location=torch.device("cpu")), )
#     model = model.to(device=device)
#     model.eval()
#     predictions = 1
#     for images in tr_loader:
#         images = images.to(device=device)
#         predicts = model(images)
#         temp,predictions=predicts.max(1)
#     return predictions[0]
# def testchest( url,image):
#     data = dataset(transform=torchvision.transforms.ToTensor(), direct_path=url, image=image)
#     tr_loader = torch.utils.data.DataLoader(dataset=data, batch_size=1, shuffle=True)
#     model = torchvision.models.googlenet(pretrained=True)
#     model.load_state_dict(torch.load("weights/googlenetchest.pth",
#                                      map_location=torch.device("cpu")), )
#     model.eval()
#     predictions = 1
#     for images in tr_loader:
#         images = images.to(device=device)
#         predicts = model(images)
#         temp, predictions = predicts.max(1)
#     return predictions[0]
#
#
#
#
#
#
#
#
#
#
#
