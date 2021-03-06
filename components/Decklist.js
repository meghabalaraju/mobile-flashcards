import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { connect } from "react-redux";

// imports expo packages
import { AppLoading } from "expo";

//imports actions
import { receiveDecks } from "../actions";

// api imports
import { fetchDecksResults } from "../utils/api";

// imports components
import Deck from "./Deck";
import { white } from "../utils/colors";

class DeckList extends Component {
  state = {
    isReady: false,
  };

  // Fetch initial data - all decks' object and shown splash screen when data is loading
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecksResults()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState({ ready: true }));
  }

  render() {
    const { decks, navigation, decksKeys } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    if (decksKeys.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              padding: 40,
              fontSize: 20,
            }}
          >
            Oops! there are no decks. Clik on Add decks to carete one.
          </Text>
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {decks &&
            decksKeys.map((key, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("Deck details", {
                    id: key,
                    deckProp: decks[key],
                  })
                }
              >
                <Deck
                  deckId={key}
                  deckProp={decks[key]}
                  style={styles.deckCard}
                />
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
    paddingTop: 1,
  },
  deckCard: {
    borderBottomWidth: 1,
    backgroundColor: white,
  },
});

/**
 * fetching all decks' object from store
 * extracting key from key:value paur in decks' object - decksKeys (will be passed to Deck component)
 * @param {object} decks
 */
const mapStateToProps = (decks) => {
  const decksKeys = decks
    ? Object.keys(decks).map((key, index) => {
        return key;
      })
    : null;

  return {
    decks,
    decksKeys,
  };
};

export default connect(mapStateToProps)(DeckList);
