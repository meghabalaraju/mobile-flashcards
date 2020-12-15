import React, { Component } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";

// utils import
import { btnColor, gray, white } from "../utils/colors";

// imports actions
import { handleDeleteData } from "../actions";

// component imports
import FillButton from "./UIComponents/FillBtn";
import OutlineButton from "./UIComponents/OutlineTextBtn";
import TextButton from "./UIComponents/TextButton";
import Deck from "./Deck";

class DeckDetails extends Component {
  state = {
    scaleValue: new Animated.Value(0),
  };

  // set header title to deck title
  componentDidMount() {
    const { navigation, deck } = this.props;
    navigation.setOptions({ title: deck.title });
    this.scaleOut();
  }

  // Transforms deck title, no. of cards
  scaleOut = () => {
    // Will change scaleValue value to 1 in 6ms
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  // navigate to "Add Cards" screen to get user inputs
  addCard = () => {
    const { navigation, deck } = this.props;
    navigation.navigate("Add Card", { id: deck.id });
  };

  // navigate to "Quiz" screen to take a test
  onStartQuiz = () => {
    const { navigation, deck } = this.props;
    navigation.navigate("Quiz", { id: deck.id });
  };

  // to delete the current deck
  deleteDeck = () => {
    const { dispatch, navigation, route } = this.props;

    // disptach async action to delete deck
    dispatch(handleDeleteData(route.params.deckProp.id));

    // naviagte back to decks list
    navigation.navigate("Decks");
  };

  render() {
    const { route } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Animated.View
            style={{
              transform: [{ scale: this.state.scaleValue }], // Bind transform to animated value
            }}
          >
            <Deck deckProp={route.params.deckProp} />
          </Animated.View>
        </View>
        <View>
          <FillButton style={styles.addCardBtn} onPress={this.addCard}>
            Add card
          </FillButton>
          <OutlineButton style={styles.startQuizBtn} onPress={this.onStartQuiz}>
            Start Quiz
          </OutlineButton>
          <TextButton style={styles.textBtn} onPress={this.deleteDeck}>
            Delete Deck
          </TextButton>
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

const mapSateToProps = (decks, { route }) => {
  const deck = route.params.id ? decks[route.params.id] : route.params.deckProp;
  return {
    deck,
  };
};

export default connect(mapSateToProps)(DeckDetails);
