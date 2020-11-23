import AsyncStorage from "@react-native-async-storage/async-storage";
export const DECK_STORAGE_KEY = "SET_KEY";

function setDummyData() {
  let dummyData = {
    decks: [
      {
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
      {
        title: "Deck2",
        totalCards: 1,
        cards: [
          {
            questionText: "Does Python work with Android?",
            answerText: "yes",
          },
        ],
      },
    ],
  };

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

// Since localstorage needs to be cleared before loading second time this app, we are just assigning back the stored already results
export function formatDecksResults(results) {
  return results === null || "undefined" ? setDummyData() : {};
}
