import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDecksResults } from "./helpers";
export const DECK_STORAGE_KEY = "MobileFlashCards:decks";

export async function fetchDecksResults() {
  try {
    const storeResults = await AsyncStorage.getItem(DECK_STORAGE_KEY).then(
      formatDecksResults
    );
    return storeResults;
  } catch (err) {
    console.log(err);
  }
}

export function submitDeck(deck) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    const decks = data.concat([deck]);
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function removeDeckEntry(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    const decks = data.filter((value) => value.id !== id);
    AsyncStorage.removeItem(DECK_STORAGE_KEY);
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function addCardEntry(id, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    const decks = data.map((deck) =>
      deck.id !== id
        ? deck
        : Object.assign({}, deck, { cards: deck.cards.concat([card]) })
    );
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
  });
}
