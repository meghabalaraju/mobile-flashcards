import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { darkOrange, gray, white } from "../utils/colors";

function FillButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.fillButton}>
      <Text style={styles.fillBtnText}>Add Card</Text>
    </TouchableOpacity>
  );
}

function OutlineButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.outlineButton}>
      <Text style={styles.outlineBtnText}>Start Quiz</Text>
    </TouchableOpacity>
  );
}

class Deck extends Component {
  addCard = () => {
    console.log("new cad will be added");
  };

  startQuiz = () => {
    console.log("quiz will start soon");
  };

  render() {
    const { deck } = this.props;
    console.log("deckView", this.props.route.params);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.text}>{deck.totalCards} cards</Text>
        <FillButton onPress={this.addCard} />
        <OutlineButton onPress={this.startQuiz} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 70,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
  },
  text: {
    marginBottom: 60,
    fontSize: 20,
    color: gray,
  },
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
  outlineButton: {
    backgroundColor: white,
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: darkOrange,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  outlineBtnText: {
    color: darkOrange,
    fontSize: 24,
  },
});

function mapStateToProps(decks, { route }) {
  const deck = decks[route.params.id];
  return {
    decks,
    deck,
  };
}

export default connect(mapStateToProps)(Deck);
