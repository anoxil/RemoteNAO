import React from "react";
import SocketIOClient from "socket.io-client";
import { StyleSheet, Text, View, Button } from "react-native";

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
  };
  
  sendInstruction = (message) => {
    socket.emit("instruction_to_rpi", message);
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Buy groceries"
          color="#5D5D5D"
          //onPress={() => { this.state.val = this.state.val + 1; }}
          onPress={() => this.sendInstruction("touch coucou")}
        />
        <Button
          title="Cook for the kids"
          color="#5D5D5D"
          //onPress={() => { this.state.val = this.state.val + 1; }}
          onPress={() => this.sendInstruction("touch byebye")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});
