
from prediction import setModel,predict
import cloudinary
import cv2
import numpy as np
import urllib.request
import json
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

def uploadOnCloudinary(n,mycol,userId):
    cloudinary.config(
        cloud_name="daers",
        api_key="699873113773439",
        api_secret="remNMRZNIirzsLNu6Tibe7O65Cg"
    )
    public_urls=[]
    for i in range(n):
        filename="Maskpredicted"+str(i)+".png"
        #url=cloudinary.uploader.upload(filename, folder="Daers/DetectedImages/",public_id="Muscle",overwrite=True,resource_type="image")
        url={"url":"updated"}
        where={"userId":userId}
        update={"$set":{"photos.backPose":url["url"]}}
        a=mycol.update_one(where,update)
        print(url["url"])

    return True;
def url_to_image(url):
  with urllib.request.urlopen(url) as resp:
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
        # Cv2.imdecode () function to decode the data into an image format Opencv
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
  # return the image
    cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image



def eventmanage(userId,model,class_name,mycol):
    try:
        x = mycol.find_one({"userId": userId}, {"photos": 1})
        backPose=x["photos"]["backPose"]
        frontPose=x["photos"]["frontPose"]
        imagerray=url_to_image(frontPose)
        print(imagerray.shape)
        images=[imagerray]
        iss=predict(model,class_name,images)
        print(iss)
        publicurls=uploadOnCloudinary(len(images),mycol,userId)
        print(publicurls)
    except Exception as E:
        print(E)

