import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECK_STORAGE_KEY, formatDecksResults, setDummyData } from "./helpers";

// AsyncStorage operations
export function fetchDecksResults() {
  AsyncStorage.removeItem(DECK_STORAGE_KEY);
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((res) => {
    return formatDecksResults(res);
  });
}

export function submitDeck({ id, deck }) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [id]: deck,
    })
  );
}

export function removeDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[id] = undefined;
    delete data[id];
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}
