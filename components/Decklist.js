import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import { receiveDecks } from "../actions";
import { fetchDecksResults } from "../utils/api";
import { white, orange, mudBrown } from "../utils/colors";

class DeckList extends Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecksResults()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  onPressList = () => {
    // ToDo: navigate to deck view
    this.props.navigation.navigate("Deck");
    console.log(this.props.navigation);
  };

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: white,
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: mudBrown,
        }}
      >
        <TouchableOpacity onPress={this.onPressList}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={{ textAlign: "center" }}>{item.totalCards} cards</Text>
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
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 32,
    textAlign: "center",
  },
});
function mapStateToProps({ decks }) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
