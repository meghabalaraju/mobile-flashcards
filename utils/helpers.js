import AsyncStorage from "@react-native-async-storage/async-storage";
export const DECK_STORAGE_KEY = "MobileFlashCards:decks";

/**
 * Generates random id as requied for the deck id
 */
export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Sets dummy data in local storage
 */
async function setDummyData() {
  let dummyData = {
    "6ni6ok3ym7mf1p33lnez": {
      id: "6ni6ok3ym7mf1p33lnez",
      title: "React Native deck",
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
      cards: [],
    },
  };

  return await AsyncStorage.setItem(
    DECK_STORAGE_KEY,
    JSON.stringify(dummyData)
  ).then(() => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => {
      return result;
    });
  });
}

// For initial setup, if user has already ran this app on a device then results from local storage returned else assigns dummy data
export function formatDecksResults(results) {
  if (results === null) {
    return setDummyData();
  } else {
    return results;
  }
}
