import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

// imports colors utils
import { white, gray } from "../utils/colors";

class Deck extends Component {
  render() {
    const { deck, style } = this.props;
    return (
      <View style={[styles.card, style]}>
        <Text style={styles.title}>{deck.title}</Text>
        {deck.cards && (
          <Text style={styles.cards}>{deck.cards.length} cards</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#cfd3ce",
  },
  cards: {
    fontSize: 16,
    color: gray,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
  },
});

/**
 * Fetching all decks from store to retrieve the deck needed for component
 * @param {object} decks - all decks from store
 * @param {string} deckId - individual deck id
 */
const mapStateToProps = (decks, { deckId }) => {
  const deck = decks[deckId];

  return {
    deck,
  };
};

export default connect(mapStateToProps)(Deck);
