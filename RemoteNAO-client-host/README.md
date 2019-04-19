# RemoteNAO-client-host
---

## What is it ?

The *RemoteNAO-client-host* folder contains the ROS package needed by the Host to receive and send all the data needed. It focuses on four features : top camera, text to speech, poses and teleoperation.

## Pre-requisites

First, it is mandatory to run this package through a Linux distribution (32 or 64 bits) because of ROS being Unix only. I also have chosen the [ROS Indigo](http://wiki.ros.org/indigo/Installation) release because the libraries and drivers supported by the official developpers/community have been poorly implemented in the newer releases.
If you don't want to waste time installing ROS and trust what developpers do, you may use this [single-line install](http://wiki.ros.org/ROS/Installation/TwoLineInstall). Finally, you simply need to follow these [instructions](http://wiki.ros.org/nao/Tutorials/Installation) to install ROS-NAO libraries and enable the communication between your Host and your NAO.
Finally you need to copy the *nao_remotenao* folder inside your catkin workspace's *src/* folder.

## How to use it ?

Before launching the package, you must be sure to have installed the Socket.IO client library [socketIO-client-nexus](https://pypi.org/project/socketIO-client-nexus/0.7.6/) :
`pip install socketIO-client-nexus==0.7.6`

It is imperative that the Host machine is connected to same network as the NAO.

Other very important point, you must replace the *basic.xap* of your *naoqi_pose* ROS package with the one in the *nao_remotenao* package:
`rm /path/to/naoqi_pose/config/basic.xap && mv basic.xap /path/to/naoqi_pose/config/`

Then simply run the main NAO .launch file :
`roslaunch nao_bringup nao_full_py.launch nao_ip:=YOUR_NAO_IP roscore_ip:=http://localhost:11311`
As well as this package's .launch file :
`roslaunch nao_remotenao remotenao.launch`


## TL;DR

#### Installation
Starting from you home directory :

```
wget https://raw.githubusercontent.com/oroca/oroca-ros-pkg/master/ros_install.sh && chmod 755 ./ros_install.sh && ./ros_install.sh catkin_ws indigo
```
Then download the Naoqi Python SDK [here](https://community.ald.softbankrobotics.com/en/resources/software/former-nao-versions-python-naoqi-sdk) and unzip it.
```
echo 'export PYTHONPATH=/path/to/library/pynaoqi-python2.7-2.X.X.XX-linuxXX:$PYTHONPATH' >> ~/.bashrc
```
```
sudo apt-get install ros-indigo-driver-base ros-indigo-move-base-msgs ros-indigo-octomap ros-indigo-octomap-msgs ros-indigo-humanoid-msgs ros-indigo-humanoid-nav-msgs ros-indigo-camera-info-manager ros-indigo-camera-info-manager-py
```
```
sudo apt-get install ros-indigo-nao-*
```
```
pip install socketIO-client-nexus==0.7.6
```
Copy this folder's *nao_remotenao* package into your catkin workspace *src/* folder.

#### Start up
Terminal #1 :
```
roscore
```
Terminal #2 :
```
roslaunch nao_bringup nao_full_py.launch nao_ip:=YOUR_NAO_IP roscore_ip:=http://localhost:11311
```
Terminal #3 :
```
roslaunch nao_remotenao remotenao.launch
```
