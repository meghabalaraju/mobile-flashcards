import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    // if the incoming action is to add multiple decks, add them to the current state
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    // Add a deck to  deck's object in current state
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };

    // remove a deck from decks' object in current state
    case REMOVE_DECK:
      const { id } = action;
      const { [id]: value, ...restDecks } = state;
      return {
        ...restDecks,
      };

    // add cards(question) to rite deck's cards' array
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: [...state[action.deckId].cards].concat(action.card),
        },
      };

    // otherwise return state
    default:
      return state;
  }
}
