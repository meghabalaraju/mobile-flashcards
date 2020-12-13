import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDecksResults } from "./helpers";
import { DECK_STORAGE_KEY } from "./helpers";

/**
 * Intial dummy data sets up
 */
export async function fetchDecksResults() {
  try {
    const storeResults = await AsyncStorage.getItem(DECK_STORAGE_KEY).then(
      formatDecksResults
    );
    return JSON.parse(storeResults);
  } catch (err) {
    console.log(err);
  }
}

/**
 * merges new input card into exisitng cards array in deck
 * @param {string} id - deck id
 * @param {object} card - contains question and answer
 */
export async function addCardEntry(id, card) {
  try {
    const fetchDeck = await AsyncStorage.getItem(DECK_STORAGE_KEY).then(
      (results) => {
        const data = JSON.parse(results);
        const deck = data[id];
        deck.cards.push(card);
        return deck;
      }
    );

    await AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({ [id]: fetchDeck })
    );
  } catch (e) {
    console.warn(e);
  }
}
