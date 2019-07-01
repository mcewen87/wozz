import { CHANGE_CATEGORY, RESET_CATEGORY } from "../actions/types";

const initialState = 0;

export default function changeCategory(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return action.payload;
    case RESET_CATEGORY:
      alert("hello");
      return 0;
    default:
      return state;
  }
}
