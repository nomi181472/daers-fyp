import os
import sys
from contents.mrcnn import model as modellib
from copyfiles import copytree
from CustomConfig import CustomConfig
from inferenceconfig import InferenceConfig
from train import train
from contents.mrcnn import utils
from contents.mrcnn import visualize
from CustomDataset import CustomDataset
from contents.mrcnn.model import log
import random
import tensorflow as tf
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import cv2
import PIL
import numpy as np
try:
    copytree(src="wastedata-Mask_RCNN-multiple-classes/main/Mask_RCNN", dst="contents")
except FileExistsError as e:
    print(e.strerror)
# try:
#     shutil.copytree('/content/drive/MyDrive/datasets/muscle','/content/dataset')
# except:
#     print()
# Root directory of the project
def doTrain():
    ROOT_DIR = "/wastedata-Mask_RCNN-multiple-classes/main/Mask_RCNN/"
    # Import Mask RCNN
    sys.path.append(ROOT_DIR)  # To find local version of the library

    # Directory to save logs and model checkpoints
    DEFAULT_LOGS_DIR = os.path.join(ROOT_DIR, "logs")

    config = CustomConfig()
    model = modellib.MaskRCNN(mode="training", config=config, model_dir=DEFAULT_LOGS_DIR)

    weights_path = "wastedata-Mask_RCNN-multiple-classes/main/Mask_RCNN/mask_rcnn_coco.h5"
            # Download weights file
    if not os.path.exists(weights_path):
        utils.download_trained_weights(weights_path)

    model.load_weights(weights_path, by_name=True, exclude=["mrcnn_class_logits",
                                                             "mrcnn_bbox_fc", "mrcnn_bbox", "mrcnn_mask"])
    train(model, config)
def get_ax(rows=1, cols=1, size=16):
  """Return a Matplotlib Axes array to be used in all visualizations in the notebook. Provide a central point to control graph sizes. Adjust the size attribute to control how big to render images"""
  _, ax = plt.subplots(rows, cols, figsize=(size*cols, size*rows))
  return ax
def doTest():
    config = InferenceConfig()
    config.display()
    # Device to load the neural network on. Useful if you're training a model on the same machine, in which case use CPU and leave the GPU for training.
    DEVICE = "/cpu:0"  # /cpu:0 or /gpu:0
    # Inspect the model in training or inference modes values: 'inference' or 'training'
    TEST_MODE = "inference"


    #Load validation dataset
    CUSTOM_DIR = "contents/datasets/"
    MODEL_DIR="contents/logs"
    dataset = CustomDataset()
    dataset.load_custom(CUSTOM_DIR, "val/")
    # Must call before using the dataset
    dataset.prepare()
    #print("Images: {}\nClasses: {}".format(len(dataset.image_ids), dataset.class_names))
    #LOAD MODEL
    # Create model in inference mode
    with tf.device(DEVICE):
      model = modellib.MaskRCNN(mode="inference", model_dir=MODEL_DIR, config=config)
    # Load COCO weights Or, load the last model you trained
    WEIGHTS_PATH="weights/mask_rcnn_object_0010 .h5"
    weights_path = WEIGHTS_PATH
    # Load weights
    print("Loading weights ", weights_path)
    model.load_weights(weights_path, by_name=True)
    #RUN DETECTION
    image_id = random.choice(dataset.image_ids)
    print(image_id)
    image, image_meta, gt_class_id, gt_bbox, gt_mask =\
      modellib.load_image_gt(dataset, config, image_id, use_mini_mask=False)
    info = dataset.image_info[image_id]
    print("image ID: {}.{} ({}) {}".format(info["source"], info["id"], image_id,dataset.image_reference(image_id)))
    # Run object detection
    results = model.detect([image], verbose=1)
    # Display results
    ax = get_ax(1)

    r = results[0]
    visualize.display_instances(image, r['rois'], r['masks'], r['class_ids'], dataset.class_names, r['scores'], ax=ax, title="Predictions")
    log("gt_class_id", gt_class_id)
    log("gt_bbox", gt_bbox)
    log("gt_mask", gt_mask)
    # This is for predicting images which are not present in dataset
    path_to_new_image = "contents/datasets/y.jpg"
    image1 = mpimg.imread(path_to_new_image)
    # Run object detection
    print(len([image1]))
    results1 = model.detect([image1], verbose=1)
    # Display results
    ax = get_ax(1)
    r1 = results1[0]

    y1, x1, y2, x2 = r1['rois'][1]
    var= r['class_ids']


    x=int(x1)
    y=int(y1)
    w=int(x2 - x1)
    h=int( y2 - y1)
    crop_img = image1[y:y + h ,x:x + w]
    crop_img=cv2.resize(crop_img, (229, 229))
    cv2.imshow("cropped", crop_img)
    cv2.waitKey(0)


    visualize.display_instances(image1, r1['rois'], r1['masks'], r1['class_ids'],
    dataset.class_names, r1['scores'], ax=ax, title="Predictions1")
    plt.show()




#doTrain()

doTest()
