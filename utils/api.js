import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECK_STORAGE_KEY, formatDecksResults } from "./helpers";

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
    ).then(() => {
      return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => {
        return JSON.parse(result);
      });
    });
  } catch (e) {
    alert("Oops! Card didn't added to decl. Please try again");
    console.warn(e);
  }
}
// Add new card to decks' object in local storage
export async function addDeckEntry(deck) {
  try {
    const newDeck = await AsyncStorage.getItem(DECK_STORAGE_KEY).then(
      (results) => {
        const data = JSON.parse(results);

        return {
          ...data,
          ...deck,
        };
      }
    );

    return await AsyncStorage.setItem(
      DECK_STORAGE_KEY,
      JSON.stringify(newDeck)
    ).then(() => {
      return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => {
        return result;
      });
    });
  } catch (e) {
    alert("Could not able to add deck. Please try again", e);
    console.warn(e);
  }
}

// Remove a deck from decks' object in local storage
export async function removeDeckEntry(id) {
  try {
    return await AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
      const data = JSON.parse(results);
      const deck = data[id];

      // delete all cards
      deck.cards.forEach((card) => delete deck.cards[card]);

      // delete the rite deck
      delete data[id];

      // store result in local storage
      return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data)).then(
        () => {
          return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => {
            return JSON.parse(result);
          });
        }
      );
    });
  } catch (e) {
    console.warn(e);
    alert("something went wrong. Please try again", e);
  }
}
