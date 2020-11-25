import { RECEIVE_DECKS, ADD_DECK } from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECK:
      console.log("reducer", state, action);
      return {
        ...state,
        ...action.deck,
      };

    default:
      return state;
  }
}
