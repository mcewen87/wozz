import { CHANGE_CATEGORY } from "./types";

export const changeCategory = category => dispatch => {
  dispatch({
    type: CHANGE_CATEGORY,
    payload: category
  });
};
