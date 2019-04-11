import React from "react";
import SocketIOClient from "socket.io-client";
import { StyleSheet, Text, TextInput, View, Button, Image, StatusBar, TouchableOpacity } from "react-native";
import { observer } from "mobx-react/native";
import ObservableStore from "./ObservableStore";
import BottomComponentPage from "./BottomComponentPages";

//To dismiss the Websocket connection warning, apparently useless (cf. https://stackoverflow.com/questions/53638667/unrecognized-websocket-connection-options-agent-permessagedeflate-pfx)
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
//

const socket = SocketIOClient("https://remote-nao.herokuapp.com", {});

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      topCameraRunning: false,
      topCameraNodeName: "null",
      bottomComponentPage: 0 // 0 = Poses & Speech, 1 = Controls
    };
  }


  
  listenerTopCamera = () => {
    this.setState({topCameraRunning: !this.state.topCameraRunning});
    
    if (!this.state.topCameraRunning) { //if camera is started
      socket.emit("asking_for_img", this.state.topCameraNodeName);
      socket.on("img_to_client", (data) => {
        ObservableStore.updateTopCamera(data[0]);
        this.setState({topCameraNodeName: data[1]});
      });      
    }
    else { //if camera is stopped
      socket.emit("asking_for_img", this.state.topCameraNodeName);
      socket.removeAllListeners("img_to_client");
      ObservableStore.updateTopCamera("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==");
      this.setState({topCameraNodeName: "null"});
    }

    /*
    if (!this.state.topCameraRunning) { //if camera is started
      socket.emit("asking_for_img", this.state.topCameraNodeName);
      socket.on("img_to_client", (data) => {
        this.setState({
          img64: data[0],
        });
      });
    } 
    else { //if camera is stopped
      socket.emit("asking_for_img", this.state.topCameraNodeName);
      socket.removeAllListeners("img_to_client");
      this.setState({
        img64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      });
    }
    */
  }

  foo = () => {
    if (this.state.bottomComponentPage == 0) {
      this.setState({bottomComponentPage: 1})
    } else {
      this.setState({bottomComponentPage: 0})
    }
  }
  
  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar hidden={true}/>

        <View style={styles.videoView}>
          <View style={styles.videoComponent}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: 'data:image/png;base64,' + ObservableStore.img64}}
            />
            </View>
            <View style={styles.videoButton}>
              <TouchableOpacity
                style={this.state.topCameraRunning ? styles.imageButtonOn : styles.imageButtonOff}
                onPress={() => this.foo()}
              >
                <Text>{this.state.topCameraRunning ? "STOP CAMERA" : "START CAMERA"}</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={styles.buttonsView}>
          <BottomComponentPage
            socket={this.socket}
            page={this.state.bottomComponentPage}
          />
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
  videoComponent: {
    flex: 4
  },
  videoButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  imageButtonOff: {
    backgroundColor: "#20f6d2",
    height: 35,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imageButtonOn: {
    backgroundColor: "#ff4c4c",
    height: 35,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  }
});
