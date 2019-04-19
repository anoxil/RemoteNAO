#!/usr/bin/env python

import rospy
from std_msgs.msg import String
from naoqi import ALProxy

from socketIO_client_nexus import SocketIO

socketIO = SocketIO('https://remote-nao.herokuapp.com')

IP = "192.168.43.161"
PORT = 9559

tts = ALProxy("ALTextToSpeech", IP , PORT)
tts.setLanguage("French")
tts.setParameter("pitchShift", 1)

def sayText(text):
    text = text.encode('ascii', 'replace')
    print("saying: " + text)
    tts.say(text)
    pub.publish(String(text))

def naotalker():
    global pub
    pub = rospy.Publisher('/speech', String, queue_size=(10))
    rospy.init_node('naotalk', anonymous=True)

    socketIO.on("text_to_speech", sayText)
    socketIO.wait()


if __name__ == '__main__':
    try:
        naotalker()
    except rospy.ROSInterruptException:
        pass