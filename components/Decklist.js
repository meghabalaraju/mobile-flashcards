import React, { Component } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";

class DeckList extends Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView></ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(decks) {
  console.log(decks);
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
