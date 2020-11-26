import AsyncStorage from "@react-native-async-storage/async-storage";
export const DECK_STORAGE_KEY = "SET_KEY";

export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function setDummyData() {
  let dummyData = [
    {
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
    {
      id: "8xf0y6ziyjabvozdd253nd",
      title: "React deck",
      totalCards: 0,
      cards: [],
    },
  ];

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

// Since localstorage needs to be cleared before loading second time this app, we are just assigning back the stored already results
export function formatDecksResults(results) {
  console.log(results);
  return results === null || "undefined"
    ? setDummyData()
    : typeof results === "undefined"
    ? setDummyData()
    : results;
}
