import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";

// Imports UI component
import FillButton from "./UIComponents/FillBtn";

// Imports utils
import { white } from "../utils/colors";
import { addCard } from "../actions";
import { addCardEntry } from "../utils/api";

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleChange = (text, inputName) => {
    this.setState(() => ({
      [inputName]: text,
    }));
  };

  onSubmit = () => {
    const { question, answer } = this.state;
    const { dispatch, navigation, deck } = this.props;
    const card = { questionText: question, answerText: answer };

    dispatch(addCard(deck.id, card));
    navigation.navigate("Deck details", { id: deck.id });
    addCardEntry(deck.id, card);
  };
  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => this.handleChange(text, "question")}
          value={question}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => this.handleChange(text, "answer")}
          value={answer}
          style={styles.textInput}
        />
        <FillButton style={styles.submitBtn} onPress={this.onSubmit}>
          SUBMIT
        </FillButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 20,
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 20,
  },
  submitBtn: {
    color: white,
    fontSize: 20,
  },
});

const mapStateToProps = (decks, { route }) => {
  const deck = decks[route.params.id];
  return {
    deck,
  };
};

export default connect(mapStateToProps)(NewCard);
