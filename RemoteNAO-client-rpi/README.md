#What is it ?

The RemoteNAO-client-rpi is a small script that must be run in Bash shell environment.
Its purpose is to receive the instructions sent by the other clients through the Heroku server. Upon reception of those instructions, it will run the corresponding Bash script with the correct ROS/NAOqi functionalities.


#How to use it ?

Before running the client script, you must be sure to have installed the Socket.IO client library [socketIO-client-nexus](https://pypi.org/project/socketIO-client-nexus/0.7.6/).
    pip install socketIO-client-nexus==0.7.6

Then simply run this script from Python2.
    python main.py
