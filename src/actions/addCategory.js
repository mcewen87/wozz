import { ADD_CATEGORY } from "./types";

export const addCategory = category => dispatch => {
  dispatch({
    type: ADD_CATEGORY,
    payload: category
  });
};
