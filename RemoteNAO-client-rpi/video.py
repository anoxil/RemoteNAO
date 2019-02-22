from naoqi import ALProxy
import vision_definitions, time

camProxy = ALProxy("ALVideoDevice", "192.168.43.116", 9559)

resolution = vision_definitions.kQQVGA
colorSpace = vision_definitions.kYUVColorSpace
fps = 20

nameId = camProxy.subscribe("python_GVM", resolution, colorSpace, fps)

for i in range(0, 20):
  camProxy.getImageRemote(nameId)
  time.sleep(0.05)

camProxy.unsubscribe(nameId)