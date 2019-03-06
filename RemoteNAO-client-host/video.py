from naoqi import ALProxy
import vision_definitions, time
from PIL import Image

IP = "192.168.43.116"
PORT = 9559

camProxy = ALProxy("ALVideoDevice", IP, PORT)

resolution = 2 #vision_definitions.kQQVGA
colorSpace = 11 #vision_definitions.kYUVColorSpace
fps = 20

nameId = camProxy.subscribe("python_GVM", resolution, colorSpace, fps)

#for i in range(0, 20):
  #print "getting image " + str(i)
naoImage = camProxy.getImageRemote(nameId)
image = naoImage[6]
#print(image)
#image_string = str(bytearray(image))
#print(image_string)
#time.sleep(0.05)

camProxy.unsubscribe(nameId)

#im = Image.frombytes("RGB", (naoImage[0], naoImage[1]), image)
#im.save("naoEyes.png", "PNG")
#im.show()