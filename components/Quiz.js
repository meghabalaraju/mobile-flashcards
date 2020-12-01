import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { darkOrange, white } from "../utils/colors";

function FillButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.fillButton}>
      <Text style={[styles.fillBtnText, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
}

class Quiz extends Component {
  render() {
    return (
      <View>
        <Text>1/2</Text>
        <Text>question</Text>
        <TextButton>Answer</TextButton>
        <FillButton style={{ color: "green" }}>Correct</FillButton>
        <FillButton style={{ color: "red" }}>Incorrect</FillButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fillButton: {
    backgroundColor: darkOrange,
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: darkOrange,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  fillBtnText: {
    color: white,
    fontSize: 24,
  },
});

function mapStateToProps(decks, { route }) {
  const deck = decks.find(({ id }) => id === route.params.id);
  return {
    deck,
    cards: deck.cards,
  };
}

export default connect(mapStateToProps)(Quiz);
