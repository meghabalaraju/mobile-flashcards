import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from "../actions";

export default function decks(state = [], action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;

    case ADD_DECK:
      return state.concat([action.deck]);

    case REMOVE_DECK:
      console.log("remove a deck", state, action.id);

      return state.filter((deck) => deck.id !== action.id);

    default:
      return state;
  }
}
