import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white, gray } from "../utils/colors";

class Deck extends Component {
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
        </View>
        <View>
          <Text style={styles.cards}>{deck.cards.length} cards</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 12,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
  },
  cards: {
    fontSize: 18,
    paddingLeft: 20,
    color: gray,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});

const mapStateToProps = (decks, { deckId }) => {
  console.log("deck list", decks, deckId);
  const deck = decks[deckId];

  return {
    deck,
  };
};

export default connect(mapStateToProps)(Deck);
