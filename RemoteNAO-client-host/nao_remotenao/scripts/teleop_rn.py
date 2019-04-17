#!/usr/bin/env python

import rospy, subprocess

from socketIO_client_nexus import SocketIO
import urllib3
urllib3.disable_warnings()

from geometry_msgs.msg import Twist, Vector3

socketIO = SocketIO('https://remote-nao.herokuapp.com')

linear_x = 0
angular_z = 0

def changeMovement(*args):
    """Function which modifies the linear and angular velocity of the robot"""

    movement = args[0]
    global linear_x
    global angular_z

    if (movement == "stop"):
        linear_x = 0
        angular_z = 0
    elif (movement == "forward"):
        if (linear_x >= 1):
            print("Impossible d'avancer plus.")
            return
        linear_x = linear_x + 0.2
    elif (movement == "backward"):
        if (linear_x <= -1):
            print("Impossible de reculer plus.")
            return
        linear_x = linear_x - 0.2
    elif (movement == "left"):
        if (angular_z >= 1):
            print("Impossible de gaucher plus.")
            return
        angular_z = angular_z + 0.2
    elif (movement == "right"):
        if (angular_z <= -1):
            print("Impossible de droiter plus.")
            return
        angular_z = angular_z - 0.2
    else:
        print("Instruction has not been understood.")

    linear = Vector3()
    linear.x = linear_x
    linear.y = 0
    linear.z = 0
    angular = Vector3()
    angular.x = 0
    angular.y = 0
    angular.z = angular_z
    instruction = Twist(linear, angular)
    pub.publish(instruction)


def teleopRN():

    global pub
    pub = rospy.Publisher("cmd_vel", Twist, queue_size=(10))
    rospy.init_node('teleopRN', anonymous=True)
    print("Publishing teleoperation through node " + rospy.get_name() + " ...")
    rate = rospy.Rate(10)

    socketIO.on("movement_instruction", changeMovement)
    socketIO.wait()

"""

    while not rospy.is_shutdown():
        print("xxxxxx")
        rate.sleep()"""

  
if __name__ == '__main__':
    try:
        teleopRN()
    except rospy.ROSInterruptException:
        pass
