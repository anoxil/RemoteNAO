#!/usr/bin/env python

import rospy, logging, subprocess, base64, io, time
import numpy as np

from PIL import Image as PIL_Image
from socketIO_client_nexus import SocketIO

from sensor_msgs.msg import Image
from rospy.numpy_msg import numpy_msg

socketIO = SocketIO('https://remote-nao.herokuapp.com')


def callback(data):
    print("sending image..")
    img_np = np.frombuffer(data.data, dtype=np.uint8).reshape(data.height, data.width, -1)
    img_pil = PIL_Image.fromarray(img_np.astype("uint8"))
    rawBytes = io.BytesIO()
    img_pil.save(rawBytes, "PNG")
    rawBytes.seek(0)
    socketIO.emit( "img_to_client", base64.b64encode(rawBytes.read()) )

    
def getTopCamera():
    rospy.init_node('get_top_camera', anonymous=True)
    print("Returning top camera output through node " + rospy.get_name() + " ...")

    rospy.Subscriber("/nao_robot/camera/top/camera/image_raw", numpy_msg(Image), callback)

    rospy.spin()
  
if __name__ == '__main__':
    getTopCamera()
