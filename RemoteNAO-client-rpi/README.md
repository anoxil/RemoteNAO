# What is it ?

The *RemoteNAO-client-rpi* is a small script that must be run in Bash shell environment.
Its purpose is to receive the instructions sent by the other clients through the Heroku server. Upon reception of those instructions, it will run the corresponding Bash script with the correct ROS/NAOqi functionalities.

# Pre-requisites

For my Raspberry Pi 3 B, I have installed the [Ubuntu Mate 16.04 Xenial](https://ubuntu-mate.org/download/) release for ARMv7 computers. On top of that, I have chosen the [ROS Kinetic](http://wiki.ros.org/kinetic/Installation) release (if you don't want to waste time installing ROS and trust what developpers do, you may use this <span style="color: purple">f</span><span style="color: blue">a</span><span style="color: cyan">b</span><span style="color: green">u</span><span style="color: #90EE90">l</span><span style="color: #FFD700">o</span><span style="color: orange">u</span><span style="color: red">s</span> [single-line install](http://wiki.ros.org/ROS/Installation/TwoLineInstall)). Finally, you simply need to follow these [instructions](http://wiki.ros.org/nao/Tutorials/Installation) on the ROS wiki to enable the communication between your Raspberry and your NAO.

> It can be a bit tricky to prepare your Raspberry Pi to control a NAO through ROS. Indeed, it is highly recommended to use the [Indigo](http://wiki.ros.org/indigo) distribution because the libraries and drivers supported by the official developpers/community have been poorly implemented to the following distributions (Kinetic, Lunar and Melodic). But this Indigo release needs some very specific GNU/Unix distributions which don't run on the ARM processor of the Raspberry Pi 3 B (the one I currently have). So these instructions may not suit you depending on the Raspberry you have.
For more informations, here are links for [ROS <-> OS](http://www.ros.org/reps/rep-0003.html) compatibility and [OS <-> Raspberry](https://elinux.org/RPi_Distributions) compatibility.

# How to use it ?

Before running the client script, you must be sure to have installed the Socket.IO client library [socketIO-client-nexus](https://pypi.org/project/socketIO-client-nexus/0.7.6/) :

`pip install socketIO-client-nexus==0.7.6`

Then simply run this script from Python2 :

`python main.py`