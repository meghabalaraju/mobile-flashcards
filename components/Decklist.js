import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import { receiveDecks } from "../actions";
import { fetchDecksResults } from "../utils/api";
import { white, mudBrown, gray } from "../utils/colors";
import { CommonActions } from "@react-navigation/native";

class DeckList extends Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecksResults()
      .then((decks) => {
        console.log(decks);
        dispatch(receiveDecks(decks));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  onPressList = (item) => {
    const { id } = item;
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: "Deck",
        params: {
          id: id,
        },
      })
    );
  };

  renderItem = (item) => {
    console.log("item in decklit", item);
    return (
      <View style={styles.listStyle}>
        <TouchableOpacity onPress={() => this.onPressList(item)}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={{ textAlign: "center", color: gray, fontSize: 20 }}>
            {item.totalCards} cards
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { ready } = this.state;
    const { decks } = this.props;
    const deckIds = Object.keys(decks);

    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View style={{ flex: 1 }}>
        {deckIds.map((id, index) => (
          <View key={index}>{this.renderItem(decks[id])}</View>
        ))}
        <Text>{JSON.stringify(decks)} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: white,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: mudBrown,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
});
function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
