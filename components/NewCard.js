import { CommonActions } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { addCardEntry } from "../utils/api";
import { mudBrown, white } from "../utils/colors";

function SubmitBtn({ onPress }) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={
          Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
        }
      >
        <Text style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  /**
   * @description - set/change multiple inputs
   * @param {string} text - input field value
   * @param {string} inputName - state's prop whose value will change
   */
  handleChange = (text, inputName) => {
    this.setState(() => ({
      [inputName]: text,
    }));
  };

  onSubmit = () => {
    const { question, answer } = this.state;
    const { dispatch } = this.props;
    const { id } = this.props.route.params;

    const card = { questionText: question, answerText: answer };

    dispatch(addCard(id, card));
    this.props.navigation.dispatch(CommonActions.goBack());
    addCardEntry(id, card);
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
        <SubmitBtn onPress={this.onSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: "center", // vertically center with default behaviour
    alignItems: "center",
    marginTop: 50,
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
    // alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 20,
  },
});

export default connect()(NewCard);
