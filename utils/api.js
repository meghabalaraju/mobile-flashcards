import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECK_STORAGE_KEY, formatDecksResults } from "./helpers";

// AsyncStorage operations
export function fetchDecksResults() {
  AsyncStorage.removeItem(DECK_STORAGE_KEY); // to make sure i am not storing any data under this key
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((res) => {
    return formatDecksResults(res);
  });
}

export function submitDeck(deck) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    const decks = data.concat([deck]);
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
  });
  // return AsyncStorage.mergeItem(
  //   DECK_STORAGE_KEY,
  //   JSON.stringify({
  //     [id]
  //   })
  // );
}

export function removeDeckEntry(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    const decks = data.filter((value) => value.id !== id);
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
  });
}
