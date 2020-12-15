import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

// impports UI component
import OutlineButton from "./UIComponents/OutlineTextBtn";
import TextButton from "./UIComponents/TextButton";

// imports utils
import { tabText, white } from "../utils/colors";

class Quiz extends Component {
  state = {
    card: {},
    index: 0,
    isComplete: false,
    score: 0,
  };

  // setSate to initial question
  componentDidMount() {
    this.updateQuestion();
  }

  // change  question after each quesion is answered by user and update state
  updateQuestion = (userAnswer) => {
    const newQuestion = this.changeQuestion();
    this.updateState(newQuestion);
    if (userAnswer) this.calculateScore(userAnswer);
  };

  // change question after each question is answred by user
  changeQuestion = () => {
    const { cards } = this.props;
    const { index } = this.state;
    const newCard = cards[index];

    // if there are no more questions left to show, update the state
    if (!newCard) {
      if (index === cards.length) {
        this.setState(() => ({
          isComplete: true,
        }));
      }
    }
    return newCard;
  };

  // update state with the question being changed
  updateState = (newQuestion) => {
    const { index } = this.state;
    this.setState(() => ({
      card: newQuestion,
      index: index + 1,
    }));
  };

  // calculate the qiuz score
  calculateScore = (userAnswer) => {
    const { card, score } = this.state;
    const { answerText } = card;

    // question should be a polar question - yes (affirmative) or no (negative or deny)
    if (
      (answerText.toLowerCase() === "yes" &&
        userAnswer.toLowerCase() === "correct") ||
      (answerText.toLowerCase() === "no" &&
        userAnswer.toLowerCase() === "incorrect")
    ) {
      this.setState(() => ({
        score: score + 1,
      }));
    }
  };

  // Redirect to "AnswerCard" view to show the answer for the current question
  showAnswer = () => {
    const { card } = this.state;
    this.props.navigation.navigate("AnswerCard", { ans: card.answerText });
  };

  render() {
    const { isComplete, index, score, card } = this.state;
    const { cards, navigation } = this.props;
    const scoreInPercent = Math.floor((score / cards.length) * 100);

    // Quiz completion - User score with a button to return to deck view
    if (isComplete) {
      return (
        <View>
          <Text style={styles.score}>You scored: {scoreInPercent}%</Text>
          <TextButton
            style={([styles.textBtn], { letterSpacing: 1, fontSize: 20 })}
            onPress={() => navigation.goBack()}
          >
            Back to Deck
          </TextButton>
        </View>
      );
    }

    return (
      <View>
        {cards && cards.length > 0 ? (
          <View>
            <Text style={styles.remainCards}>
              {index}/{cards.length}
            </Text>
            <Text style={styles.qText}>{card.questionText}</Text>
            <TextButton style={styles.ansBtn} onPress={this.showAnswer}>
              Answer
            </TextButton>
            <OutlineButton
              style={styles.correctBtn}
              onPress={() => this.updateQuestion("correct")}
            >
              Correct
            </OutlineButton>
            <OutlineButton
              style={styles.inCorrectBtn}
              onPress={() => this.updateQuestion("Incorrect")}
            >
              Incorrect
            </OutlineButton>
          </View>
        ) : (
          // If the there are no cards in the deck
          <View style={{ flex: 1, justifyContent: "center", padding: 40 }}>
            <Text>
              "Sorry, you don't have any cards to start the quiz. Please go back
              and add cards into the deck"
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ansBtn: {
    fontSize: 20,
    marginBottom: 20,
  },
  correctBtn: {
    backgroundColor: "green",
    borderWidth: 0,
    color: white,
    letterSpacing: 1,
    fontSize: 20,
  },
  inCorrectBtn: {
    backgroundColor: tabText,
    borderWidth: 0,
    color: white,
    fontSize: 20,
    letterSpacing: 1,
  },
  qText: {
    fontSize: 40,
    marginBottom: 30,
    padding: 20,
    textAlign: "center",
  },
  remainCards: { padding: 10, fontSize: 20 },
  score: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 60,
    marginBottom: 40,
  },
});

const mapStateToProps = (decks, { route }) => {
  const deck = decks[route.params.id];
  return {
    deck,
    cards: deck.cards,
  };
};

export default connect(mapStateToProps)(Quiz);
