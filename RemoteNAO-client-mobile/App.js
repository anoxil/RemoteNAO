import React from "react";
import SocketIOClient from "socket.io-client";
import { StyleSheet, Text, TextInput, View, Button, Image, StatusBar, TouchableOpacity } from "react-native";

//To dismiss the Websocket connection warning, apparently useless (cf. https://stackoverflow.com/questions/53638667/unrecognized-websocket-connection-options-agent-permessagedeflate-pfx)
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
//

const socket = SocketIOClient("https://remote-nao.herokuapp.com", {});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      topCameraRunning: false,
      img64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    };
  }
  
  listenerTopCamera() {
    this.setState({topCameraRunning: !this.state.topCameraRunning});

    if (!this.state.topCameraRunning) { //if camera is not watched
      socket.on("img_to_client", function(image) {
        this.setState({img64: image});
      });
      socket.emit("asking_for_img", "");
    } 
    else { //if camera is watched
      socket.removeAllListeners("img_to_client");
    }
  };

  sendInstruction = (message) => {
    socket.emit("instruction_to_host", message);
  };
  
  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar hidden={true}/>
        <View style={styles.videoView}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: 'data:image/png;base64,' + this.state.img64}}
          />
        </View>
        <View style={styles.buttonsView}>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={this.state.topCameraRunning ? styles.imageButtonOn : styles.imageButtonOff}
              onPress={() => {this.listenerTopCamera()}}
            >
              <Text>{this.state.topCameraRunning ? "STOP CAMERA" : "START CAMERA"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <Button
              title="Say hello to the world!"
              color="#5D5D5D"
              onPress={() => this.sendInstruction("helloworld")}
            />
            <Button
              title="Sit!"
              color="#5D5D5D"
              onPress={() => this.sendInstruction("sit")}
            />
          </View>
          <View style={styles.buttons}>
            <Button
              title="Rest on the ground."
              color="#5D5D5D"
              onPress={() => this.sendInstruction("lyingground")}
            />
            <Button
              title="Stand up!"
              color="#5D5D5D"
              onPress={() => this.sendInstruction("standup")}
            />
          </View>
          <View style={styles.buttons}>
            <TextInput
              value={this.state.text}
              onChangeText={(text) => this.setState({text})}
              placeholder="Write here what NAO must say..."
            />
            <Button
              title="Say this text."
              color="#5D5D5D"
              onPress={() => this.sendInstruction({0: "saytext", 1: this.state.text})}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoView: {
    flex: 2
  },
  buttonsView: {
    flex: 3
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  imageButtonOff: {
    backgroundColor: "#20f6d2",
    height: 50,
    width: 190,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imageButtonOn: {
    backgroundColor: "#ff4c4c",
    height: 50,
    width: 190,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  }
});
