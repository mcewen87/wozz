import { DELETE_EVENT } from "./types";

export const deleteEvent = eventDetails => dispatch => {
  dispatch({
    type: DELETE_EVENT,
    payload: eventDetails
  });
};
