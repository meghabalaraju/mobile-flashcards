import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECK_STORAGE_KEY, formatDecksResults } from "./helpers";

export function fetchDecksResults() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDecksResults)
    .then((reults) => {
      return reults;
    });
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
