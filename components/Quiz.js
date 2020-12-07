import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { darkOrange, white, lightPurp } from "../utils/colors";
import { event } from "react-native-reanimated";

function FillButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.fillButton}>
      <Text style={[styles.fillBtnText, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
}

class Quiz extends Component {
  state = {
    card: {},
    index: 0,
    isComplete: false,
    score: 0,
  };

  componentDidMount() {
    this.updateQuestion();
  }

  updateQuestion = (event, userAnswer) => {
    console.log("event", event, userAnswer);
    const newQuestion = this.changeQuestion();
    this.updateState(newQuestion);
    if (userAnswer) {
      this.calculateScore(userAnswer);
    }
  };

  changeQuestion = () => {
    const { cards } = this.props;
    const { index } = this.state;
    const newCard = cards[index];
    console.log("newCard", newCard);
    if (!newCard) {
      if (index === cards.length) {
        this.setState(() => ({
          isComplete: true,
        }));
      }
    }
    return newCard;
  };

  updateState = (newQuestion) => {
    const { index } = this.state;
    this.setState((currentState) => ({
      card: newQuestion,
      index: index + 1,
    }));
  };

  calculateScore = (userAnswer) => {
    const { card, score } = this.state;
    const { answerText } = card;
    if (
      (answerText.toLowerCase() === "yes" &&
        userAnswer.toLowerCase() === "correct") ||
      (answerText.toLowerCase() === "no" &&
        userAnswer.toLowerCase() === "incorrect")
    ) {
      this.setState((currentState) => ({
        score: score + 1,
      }));
    }
  };

  showAnswer = () => {
    const { card } = this.state;
    this.props.navigation.navigate("AnswerCard", { ans: card.answerText });
  };

  toHome = () => {
    this.props.navigation.navigate("Decks");
  };

  render() {
    const { card, index, isComplete } = this.state;
    const { cards } = this.props;

    if (cards.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", padding: 40 }}>
          <Text>
            "Sorry, you don't have any cards to start the quiz. Please go back
            and add cards into the deck"
          </Text>
        </View>
      );
    }

    if (isComplete) {
      const { score } = this.state;
      const scoreInPercent = Math.floor((score / cards.length) * 100);
      return (
        <View>
          <Text style={{ textAlign: "center", fontSize: 24, marginTop: 60 }}>
            You scored: {scoreInPercent}%
          </Text>
          <TextButton style={styles.textBtn} onPress={this.toHome}>
            Go home
          </TextButton>
        </View>
      );
    }

    return (
      <View>
        <Text>
          {index}/{cards.length}
        </Text>
        <Text style={{ textAlign: "center", margin: 50, fontSize: 20 }}>
          {card.questionText}
        </Text>
        {/* show the answer */}
        <TextButton
          style={{
            textAlign: "center",
            color: darkOrange,
            marginBottom: 10,
            fontSize: 24,
          }}
          onPress={this.showAnswer}
        >
          Answer
        </TextButton>

        <FillButton
          style={[styles.correctBtn]}
          onPress={() => this.updateQuestion(event, "correct")}
        >
          Correct
        </FillButton>
        <FillButton
          style={styles.incorrectBtn}
          onPress={() => this.updateQuestion(event, "incorrect")}
        >
          Incorrect
        </FillButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fillButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  correctBtn: {
    backgroundColor: "green",
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  incorrectBtn: {
    backgroundColor: "red",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  fillBtnText: {
    color: white,
    fontSize: 24,
  },
  textBtn: {
    textAlign: "center",
    color: lightPurp,
    fontSize: 24,
  },
});

function mapStateToProps(decks, { route }) {
  const deck = decks.find(({ id }) => id === route.params.id);
  return {
    deck,
    cards: deck.cards,
  };
}

export default connect(mapStateToProps)(Quiz);
