import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { mudBrown, white } from "../utils/colors";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { generateUID } from "../utils/helpers";
import { addDeckEntry } from "../utils/api";

function SubmitBtn({ onPress }) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={
          Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
        }
      >
        <Text style={styles.submitBtnText}>Create deck</Text>
      </TouchableOpacity>
    </View>
  );
}

class NewDeck extends Component {
  state = {
    title: "",
  };

  onSubmit = () => {
    const { dispatch } = this.props;
    const { title } = this.state;
    const id = generateUID();
    const newDeck = {
      [id]: {
        id: id,
        title: title,
        totalCards: 0,
        cards: [],
      },
    };

    dispatch(addDeck(newDeck));

    this.setState(() => ({ title: "" }));

    addDeckEntry(newDeck);

    this.props.navigation.navigate("Deck details", {
      id: id,
      deckProp: {
        id: id,
        title: title,
        totalCards: 0,
        cards: [],
      },
    });
  };

  handleChange = (event) => {
    const { text } = event.nativeEvent;

    this.setState(() => ({
      title: text,
    }));
  };

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          placeholder="    new deck name"
          onChange={this.handleChange}
          value={title}
          style={styles.textInput}
        />
        <SubmitBtn onPress={this.onSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    // justifyContent: "center", // vertically center with default behaviour
    alignItems: "center",
  },
  iosSubmitBtn: {
    backgroundColor: mudBrown,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: mudBrown,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 40,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 20,
  },
});

const mapStateToProps = (decks) => {
  return {
    decks,
  };
};
export default connect(mapStateToProps)(NewDeck);
