import { DELETE_CATEGORY } from "./types";

export const deleteCategory = id => dispatch => {
  dispatch({
    type: DELETE_CATEGORY,
    payload: id
  });
};
