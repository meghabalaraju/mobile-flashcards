import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { removeDeck } from "../actions";
import { darkOrange, gray, white, purple } from "../utils/colors";
import { removeDeckEntry } from "../utils/api";
import { CommonActions } from "@react-navigation/native";

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

function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
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

  deleteDeck = () => {
    const { remove, toHome } = this.props;
    const { deck } = this.props.route.params;
    remove();
    toHome();
    removeDeckEntry(deck.id);
  };

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.text}>{deck.totalCards} cards</Text>
        <FillButton onPress={this.addCard} />
        <OutlineButton onPress={this.startQuiz} />
        <TextButton onPress={this.deleteDeck}>Delete Deck</TextButton>
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
  textBtn: {
    textAlign: "center",
    color: purple,
  },
});

function mapStateToProps(decks, { route }) {
  const { deck } = route.params;
  return {
    decks,
    deck,
  };
}

function mapDispatchToProps(dispatch, { navigation, route }) {
  const { deck } = route.params;

  return {
    remove: () => dispatch(removeDeck(deck.id)),
    toHome: () => navigation.navigate("Decks"),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
