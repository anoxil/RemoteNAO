# RemoteNAO-client-mobile
---

## What is it ?

The *RemoteNAO-client-mobile* folder contains the React Native code of the mobile app which the user may use to control remotely the robot.
You can find a .apk file in the folder if you wish to keep my version. You'll have to accept apps from unknown sources as it is not a verified app ([tutorial here](https://www.applivery.com/docs/troubleshooting/android-unknown-sources)).

## Pre-requisites

If you wish to modify the code or build the app, you must have Node.js and npm installed.
You also have to npm install the SocketIO-client library :
`npm install --save socket.io-client`

I have used Expo to develop this project and I recommend it to you as well. You can find more info in the [documentation](https://docs.expo.io/versions/latest/).

Also remember to change the "remote-nao.herokuapp.com" occurence with your own Heroku server!

## How to use it ?

#### Start up

First, run the npm install command : `npm install`
Then start the project : `npm start`
And that's it!

#### Building apps

Be sure to have Expo installed `npm install -g expo-cli` then run it `expo init`
Modify the *app.json* file as indicated in this [documentation](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/#2-configure-appjson).

And build those apps :
* Android : `expo build:android`
* iOS : `expo build:ios` (you must have an Apple Developer ID to build it)