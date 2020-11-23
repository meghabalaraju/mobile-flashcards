import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { mudBrown, white } from "../utils/colors";

function SubmitBtn({ onPress }) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={
          Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
        }
      >
        <Text style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

class NewDeck extends Component {
  onSubmit = () => {
    console.log("button pressed");
    // manage state in store
    // redirect to deckView to create cards and start a quiz
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <SubmitBtn onPress={this.onSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center", // vertically center
    alignItems: "center",
  },
  iosSubmitBtn: {
    backgroundColor: mudBrown,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: mudBrown,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    // alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});

export default NewDeck;
