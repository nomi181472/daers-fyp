
from prediction import setModel,predict
import cloudinary
import cv2
import numpy as np
import urllib.request
from datetime import date

today = date.today()
def update_levels(key,value,where,mycol):
    update = {
        "$set": {f'{key}.isValid': True, f'{key}.level': value}
    }
    a=mycol.update_one(where, update)



def uploadOnCloudinary(n,mycol,userId,levels):
    cloudinary.config(
        cloud_name="daers",
        api_key="699873113773439",
        api_secret="remNMRZNIirzsLNu6Tibe7O65Cg"
    )

    for i in range(n):
        filename="Maskpredicted.png"
        #filename=""
        url=cloudinary.uploader.upload(filename, folder="Daers/DetectedImages/",public_id="Muscle"+userId,resource_type="image")
        #url={"url":"updated"} #avoiding space
        where={"userId":userId}
        update={"$set":{"photos.backPose":url["url"]}}
        a=mycol.update_one(where,update)
        value = 1
        if "chest" in levels:
            update_levels("chest", levels["chest"], where, mycol)
        if ("abs" in levels):
            update_levels("abs", levels["abs"], where, mycol)
        if ("shoulderl" in levels or "shoulderr" in levels):
            if (levels["shoulderl"] > levels["shoulderr"]):
                value = levels["shoulderl"]
            else:
                value = levels["shoulderr"]
            update_levels("shoulder", value, where, mycol)
        if ("thighr" in levels or "thighl" in levels):
            if (levels["thighr"] > levels["thighl"]):
                value = levels["thighr"]
            else:
                value = levels["thighl"]
            update_levels("legs", value, where, mycol)
        if ("bicepsl" in levels or "bicepsr" in levels):
            if (levels["bicepsl"] > levels["bicepsr"]):
                value = levels["bicepsl"]
            else:
                value = levels["bicepsr"]
            update_levels("biceps", value, where, mycol)
        print(url["url"])
    return True
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
        #backPose=x["photos"]["backPose"]
        frontPose=x["photos"]["frontPose"]
        imagerray=url_to_image(frontPose)
        images=[imagerray]
        levels = predict(model, class_name, images,)

        publicurls=uploadOnCloudinary(len(images),mycol,userId,levels)
        print(publicurls)
    except Exception as E:
        print(E)

