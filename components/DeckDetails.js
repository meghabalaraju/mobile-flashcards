import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

// utils import
import { btnColor, gray, white } from "../utils/colors";

// component imports
import FillButton from "./UIComponents/FillBtn";
import OutlineButton from "./UIComponents/OutlineTextBtn";
import TextButton from "./UIComponents/TextButton";

class DeckDetails extends Component {
  // set header title to deck title
  componentDidMount() {
    const { navigation, deck } = this.props;
    navigation.setOptions({ title: deck.title });
  }

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.card}>{deck.cards.length} cards</Text>
        </View>
        <View>
          <FillButton style={styles.addCardBtn}>Add card</FillButton>
          <OutlineButton style={styles.startQuizBtn}>Start Quiz</OutlineButton>
          <TextButton style={styles.textBtn}>Delete Deck</TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  details: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  card: {
    fontSize: 16,
    color: gray,
    textAlign: "center",
  },
  addCardBtn: {
    color: white,
    fontSize: 20,
  },
  startQuizBtn: {
    color: btnColor,
    fontSize: 20,
  },
  textBtn: {
    fontSize: 20,
  },
});

const mapSateToProps = (dekcs, { route }) => {
  const deck = dekcs[route.params.id];
  return {
    deck,
  };
};

export default connect(mapSateToProps)(DeckDetails);
