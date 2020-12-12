import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";
import Deck from "./Deck";
import { white, gray, orange } from "../utils/colors";

class DeckList extends Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { decks, navigation, decksKeys } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Mobile Flashcards</Text>
          {decks &&
            decksKeys.map((key, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("DeckDetails", { id: key })}
              >
                <Deck deckId={key} />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
    color: orange,
  },
});

function mapStateToProps(decks) {
  const decksKeys = decks
    ? Object.keys(decks).map((key, index) => {
        return key;
      })
    : null;

  return {
    decks,
    decksKeys,
  };
}

export default connect(mapStateToProps)(DeckList);
