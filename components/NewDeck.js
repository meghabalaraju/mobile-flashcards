import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  render() {
    return (
      <View>
        <View>
          <Text>title</Text>
        </View>
        <View>
          <Text>new deck will be here</Text>
        </View>
      </View>
    );
  }
}

export default connect()(Deck);
