import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Image, StatusBar, TouchableOpacity } from "react-native";

export default class BottomComponentPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    sendInstruction = (message) => {
        socket.emit("instruction_to_rpi", message);
    }

    render() {
        if (this.props.page == 0) {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.buttons}>
                        <Button
                        title="Say hello to the world!"
                        color="#5D5D5D"
                        onPress={() => {
                            this.sendInstruction("helloworld");
                            console.log("coucou");
                        }}
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
            );
        }
        else {
            return (
                <View style={styles.buttonsView}><Text>soon to be controls page...</Text></View>
            );
        }
    }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});