import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { removeDeck } from "../actions";
import { darkOrange, gray, white, purple } from "../utils/colors";
import { fetchDecksResults, removeDeckEntry } from "../utils/api";
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
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
}

class Deck extends Component {
  addCard = () => {
    const { deck } = this.props;

    this.props.navigation.navigate("AddCard", {
      id: deck.id,
    });
  };

  startQuiz = () => {
    console.log("quiz will start soon");
    const { deck } = this.props;

    this.props.navigation.navigate("Quiz", {
      id: deck.id,
    });
  };

  deleteDeck = (id) => {
    const { dispatch } = this.props;
    dispatch(removeDeck(id));
    this.props.navigation.navigate("Decks");
    removeDeckEntry(id);
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.text}>{deck.cards.length} cards</Text>
        <FillButton onPress={this.addCard} />
        <OutlineButton onPress={this.startQuiz} />
        <TextButton onPress={() => this.deleteDeck(deck.id)}>
          Delete Deck
        </TextButton>
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
  const deck = decks.find(({ id }) => id === route.params.id);
  return {
    decks,
    deck,
  };
}

export default connect(mapStateToProps)(Deck);
