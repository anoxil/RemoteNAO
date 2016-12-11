import React from "react";
import { StyleSheet, TextInput, View, Button, Text} from "react-native";

export default class BottomComponentPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            linear_x: 0,
            angular_z: 0
        }

        socket = this.props.socketProp;
    }

    sendInstruction = (message) => {
        socket.emit("instruction_to_rpi", message);
    }

    /*
    walking : #valeur entre 0 et 1 correspondent à la portée du pas
    marche en avant : rostopic pub -1 /cmd_vel geometry_msgs/Twist '{linear: {x: 1.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}'      # négatif = arrière
    marche en crabe : rostopic pub -1 /cmd_vel geometry_msgs/Twist '{linear: {x: 0.0, y: 1.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}'      # négatif = vers droite
    marche tournant : rostopic pub -1 /cmd_vel geometry_msgs/Twist '{linear: {x: 1.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.0}}'      # négatif = vers droite
    */
    changeMovement = (movement) => {
        socket.emit("movement_instruction", movement);
        if (movement == "stop") {
            this.setState({linear_x: 0, angular_z: 0})
        } else if (movement == "forward") {
            if (this.state.linear_x >= 1) {return;}
            this.setState({linear_x: this.state.linear_x + 0.2})
        } else if (movement == "backward") {
            if (this.state.linear_x <= -1) {return;}
            this.setState({linear_x: this.state.linear_x - 0.2})
        } else if (movement == "left") {
            if (this.state.angular_z >= 1) {return;}
            this.setState({angular_z: this.state.angular_z + 0.2})
        } else if (movement == "right") {
            if (this.state.angular_z <= -1) {return;}
            this.setState({angular_z: this.state.angular_z - 0.2})
        }
    }



    render() {

        let lx = this.state.linear_x;
        let az = this.state.angular_z;

        let vbTopGreen = (lx > 0) ? (lx*100) + "%" : "0%";
        let vbBottomGreen = (lx < 0) ? (lx*-100) + "%" : "0%";
        let vbTopGrey = (lx > 0) ? (100 - (lx*100)) + "%" : "100%";
        let vbBottomGrey = (lx < 0) ? (100 - (lx*-100)) + "%" : "100%";
        let hbLeftGreen = (az > 0) ? (az*100) + "%" : "0%";
        let hbRightGreen = (az < 0) ? (az*-100) + "%" : "0%";
        let hbLeftGrey = (az > 0) ? (100 - (az*100)) + "%" : "100%";
        let hbRightGrey = (az < 0) ? (100 - (az*-100)) + "%" : "100%";

        if (this.props.page == 0) { // POSES PAGE
            return (
                <View style={{flex: 1}}>
                    <View style={styles.posesButtons}>

                        <Button
                        title="Sit!"
                        color="#5D5D5D"
                        onPress={() => this.sendInstruction("sit")}
                        />
                    </View>
                    <View style={styles.posesButtons}>
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
                </View>
            );
        }
        else if (this.props.page == 1) { // MOVEMENT PAGE
            return (
                <View style={{flex: 1}}>

                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Button
                            title="Forward"
                            onPress={() => this.changeMovement("forward")}
                        />
                    </View>

                    <View style={styles.verticalBar}>
                        <View style={{width: 20, height: vbTopGrey, backgroundColor: "grey"}}/>
                        <View style={{width: 20, height: vbTopGreen, backgroundColor: "green"}}/>
                    </View>

                    <View style={styles.middleButtons}>
                        <View style={{flex: 1}}>
                            <Button
                                title="Left"
                                onPress={() => this.changeMovement("left")}
                            />
                        </View>
                        <View style={styles.horizontalBar}>
                            <View style={{width: hbLeftGrey, height: 20, backgroundColor: "grey"}}/>
                            <View style={{width: hbLeftGreen, height: 20, backgroundColor: "green"}}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Button
                                title="Stop"
                                onPress={() => this.changeMovement("stop")}
                            />
                        </View>
                        <View style={styles.horizontalBar}>
                            <View style={{width: hbRightGreen, height: 20, backgroundColor: "green"}}/>
                            <View style={{width: hbRightGrey, height: 20, backgroundColor: "grey"}}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Button
                                title="Right"
                                onPress={() => this.changeMovement("right")}
                            />
                        </View>
                    </View>

                    <View style={styles.verticalBar}>
                        <View style={{width: 20, height: vbBottomGreen, backgroundColor: "green"}}/>
                        <View style={{width: 20, height: vbBottomGrey, backgroundColor: "grey"}}/>
                    </View>

                    <View style={styles.topBottomButtons}>
                        <Button
                            title="Backward"
                            onPress={() => this.changeMovement("backward")}
                        />
                    </View>

                </View>
            );
        }
        else { // SPEECH PAGE
            return (
                <View style={{flex: 1}}>
                    <View style={styles.posesButtons}>
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
                    <View style={styles.posesButtons}>
                        <Button
                        title="Say hello to the world!"
                        color="#5D5D5D"
                        onPress={() => {
                            this.sendInstruction("helloworld");
                        }}
                        />
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
  posesButtons: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  middleButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  topBottomButtons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  horizontalBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  verticalBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});