import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from "../actions";

export default function decks(state = [], action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;

    case ADD_DECK:
      return state.concat([action.deck]);

    case REMOVE_DECK:
      return state.filter((deck) => deck.id !== action.id);

    case ADD_CARD:
      return state.map((deck) =>
        deck.id !== action.deckId
          ? deck
          : Object.assign({}, deck, { cards: deck.cards.concat([action.card]) })
      );

    default:
      return state;
  }
}
