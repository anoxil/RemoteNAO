# RemoteNAO-server
---

## What is it ?

The *RemoteNAO-server* folder contains the Node.js code of the Heroku app which links mobile clients and the host client to allow data flow.

## Pre-requisites

Simply create an account on [Heroku](https://www.heroku.com/) and then create an app. That's it for now!
(It's also best to have Node.js and npm installed on your machine in case you want to personalize the server's code.)

## How to use it

You need to upload the code contained in this folder to your Heroku app. In order to do that, follow the instructions written in your app dashboard :

```
heroku login
```
```
heroku git:clone -a APP_NAME
```
```
cd APP_NAME
```
```
git add .
```
```
git commit -am "COMMIT_MESSAGE"
```
```
git push heroku master
```
The server is ready to go!