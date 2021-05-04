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
import cv2
import random
import tensorflow as tf
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
try:
    copytree(src="wastedata-Mask_RCNN-multiple-classes/main/Mask_RCNN", dst="contents")
except FileExistsError as e:
    print(e.strerror)
def get_ax(rows=1, cols=1, size=16):
  """Return a Matplotlib Axes array to be used in all visualizations in the notebook. Provide a central point to control graph sizes. Adjust the size attribute to control how big to render images"""
  _, ax = plt.subplots(rows, cols, figsize=(size*cols, size*rows))
  return ax
def setModel():
    config = InferenceConfig()
    config.display()
    # Device to load the neural network on. Useful if you're training a model on the same machine, in which case use CPU and leave the GPU for training.
    DEVICE = "/cpu:0"  # /cpu:0 or /gpu:0
    # Inspect the model in training or inference modes values: 'inference' or 'training'
    TEST_MODE = "inference"

    # Load validation dataset
    CUSTOM_DIR = "contents/datasets/"
    MODEL_DIR = "contents/logs"
    dataset = CustomDataset()
    dataset.load_custom(CUSTOM_DIR, "val/")
    # Must call before using the dataset
    dataset.prepare()
    # print("Images: {}\nClasses: {}".format(len(dataset.image_ids), dataset.class_names))
    # LOAD MODEL
    # Create model in inference mode
    with tf.device(DEVICE):
        model = modellib.MaskRCNN(mode="inference", model_dir=MODEL_DIR, config=config)
    # Load COCO weights Or, load the last model you trained
    WEIGHTS_PATH = "weights/mask_rcnn_object_0010 .h5"
    weights_path = WEIGHTS_PATH
    # Load weights
    print("Loading weights ", weights_path)
    model.load_weights(weights_path, by_name=True)
    # RUN DETECTION
    image_id = random.choice(dataset.image_ids)
    print(image_id)
    image, image_meta, gt_class_id, gt_bbox, gt_mask = \
        modellib.load_image_gt(dataset, config, image_id, use_mini_mask=False)
    info = dataset.image_info[image_id]
    print("image ID: {}.{} ({}) {}".format(info["source"], info["id"], image_id, dataset.image_reference(image_id)))
    # Run object detection
    # results = model.detect([image], verbose=1)
    # Display results
    # ax = get_ax(1)

    # r = results[0]
    # visualize.display_instances(image, r['rois'], r['masks'], r['class_ids'], dataset.class_names, r['scores'], ax=ax, title="Predictions")
    # log("gt_class_id", gt_class_id)
    # log("gt_bbox", gt_bbox)
    # log("gt_mask", gt_mask)
    # This is for predicting images which are not present in dataset
    return model, dataset.class_names
def detect(crop_imag):
    return 1
def predictLevel(boxes,image1,class_names,class_ids):
    levels={}
    for i in range(len(boxes)):
        y1, x1, y2, x2=boxes[i]
        x = int(x1)
        y = int(y1)
        w = int(x2 - x1)
        h = int(y2 - y1)
        crop_img = image1[y:y + h, x:x + w]
        crop_img = cv2.resize(crop_img, (229, 229))
        plt.imsave("Cropped.png", cv2.cvtColor(crop_img, cv2.COLOR_BGR2RGB))
        print(class_ids[i])
        levels[class_names[class_ids[i]]]=detect(crop_img)
    return  levels




    return 1;
def predict(model,class_names,images):
    path_to_new_image = "contents/datasets/y.jpg"
    #image1 = mpimg.imread(path_to_new_image)
    # Run object detection
    for i in range(len(images)):
        image1=images[i]
        results1 = model.detect([image1], verbose=1)
        # Display results

        ax = get_ax(1)
        r1 = results1[0]
        levels=predictLevel(r1["rois"],image1,class_names,r1['class_ids'])
        print(levels)


        visualize.display_instances(image1, r1['rois'], r1['masks'], r1['class_ids'],
                                class_names, r1['scores'], ax=ax, title="Predictions1",level=levels)
        print(class_names)
        filename="Maskpredicted"+str(i)+".png"
        plt.savefig(filename,pad_inches=1)
    return True,levels