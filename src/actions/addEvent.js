import { ADD_EVENT } from "./types";

export const addEvent = eventDetails => dispatch => {
  dispatch({
    type: ADD_EVENT,
    payload: eventDetails
  });
};
