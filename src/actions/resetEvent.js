import { RESET_EVENT } from "./types";

export const resetEvent = eventDetails => dispatch => {
  dispatch({
    type: RESET_EVENT,
    payload: eventDetails
  });
};
