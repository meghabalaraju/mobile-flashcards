import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import { receiveDecks, removeDeck } from "../actions";
import { white, mudBrown } from "../utils/colors";
import { CommonActions } from "@react-navigation/native";
import { fetchDecksResults } from "../utils/api";

class DeckList extends Component {
  state = {
    ready: false,
  };

  removeDeck = (id) => {
    const { dispatch } = this.props;
    dispatch(removeDeck(id));
  };
  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecksResults()
      .then((decks) => {
        dispatch(receiveDecks(decks));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  onPressList = ({ item }) => {
    const { id } = item;

    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: "Deck",
        params: {
          id,
          removeDeck: removeDeck(id),
        },
      })
    );
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => this.onPressList({ item })}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={{ textAlign: "center" }}>{item.cards.length} cards</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { ready } = this.state;
    const { decks } = this.props;

    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View style={{ flex: 1 }}>
        {decks && (
          <FlatList
            data={decks}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: mudBrown,
  },
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
    decks: decks,
  };
}

export default connect(mapStateToProps)(DeckList);
