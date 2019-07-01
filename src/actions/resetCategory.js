import { RESET_CATEGORY } from "./types";

export const resetCategory = category => dispatch => {
  dispatch({
    type: RESET_CATEGORY
  });
};
