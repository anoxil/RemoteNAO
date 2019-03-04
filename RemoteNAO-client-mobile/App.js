import React from "react";
import SocketIOClient from "socket.io-client";
import { StyleSheet, TextInput, View, Button } from "react-native";

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
      text: ''
    };
  }
  
  sendInstruction = (message) => {
    socket.emit("instruction_to_rpi", message);
  };
  
  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.video}>

        </View>
        <View style={{flex: 1}}>
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
  video: {
    flex: 1,
    backgroundColor: "blue"
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});
