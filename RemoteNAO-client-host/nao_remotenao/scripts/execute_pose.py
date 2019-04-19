#!/usr/bin/env python

import rospy
import sys
import actionlib

from naoqi_bridge_msgs.msg import BodyPoseActionGoal, BodyPoseGoal
from socketIO_client_nexus import SocketIO

socketIO = SocketIO('https://remote-nao.herokuapp.com')



def executePose(pose):
    actionGoal = BodyPoseActionGoal()
    goal = BodyPoseGoal()
    goal.pose_name = pose
    actionGoal.goal = goal

    print("Executing pose " + str(pose))
    
    pub.publish(actionGoal)


def naoPose():
    global pub
    pub = rospy.Publisher("body_pose/goal", BodyPoseActionGoal, queue_size=(10))
    rospy.init_node('execute_pose')
    socketIO.on("execute_pose", executePose)
    socketIO.wait()

if __name__ == '__main__':
    try:
        naoPose()
    except rospy.ROSInterruptException:
        pass
