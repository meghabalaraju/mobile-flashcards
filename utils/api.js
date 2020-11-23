import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECK_STORAGE_KEY, formatDecksResults } from "./helpers";

// AsyncStorage operations
export function fetchDecksResults() {
  // AsyncStorage.removeItem(DECK_STORAGE_KEY);
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((res) =>
    formatDecksResults(res)
  );
}
