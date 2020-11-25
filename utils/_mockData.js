let decks = {
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    title: "React Native deck",
    totalCards: 3,
    cards: [
      {
        questionText: "Does React Native work with Android?",
        answerText: "yes",
      },
      {
        questionText: "Does React Native work with ios?",
        answerText: "yes",
      },
      {
        questionText: "Does React Native work with web?",
        answerText: "yes",
      },
    ],
  },
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    title: "React deck",
    totalCards: 0,
    cards: [],
  },
};

export function _getDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...decks }), 1000);
  });
}
