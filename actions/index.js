import { addCardEntry, removeDeckEntry } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const ADD_CARD = "ADD_CARD";

// to receive multiple decks
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

// to add a new deck object
export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

// to remove a deck object
export function removeDeck(id, decks) {
  return {
    type: REMOVE_DECK,
    id,
    decks,
  };
}

// receives a card array card: [{q: "", a: ""}] and deck id
export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}

// Async add card
export function handleAddCard(deckId, card) {
  return (dispatch) => {
    return addCardEntry(deckId, card).then((decks) => {
      dispatch(addCard(deckId, card));
    });
  };
}

// Async delete deck
export function handleDeleteData(id) {
  return (dispatch) => {
    return removeDeckEntry(id).then((decks) => {
      dispatch(removeDeck(id, decks));
    });
  };
}
