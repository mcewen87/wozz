import { GET_DATA } from "./types"

export const getData = events => dispatch => {
  dispatch({
    type: GET_DATA,
    data: events,
  })
}
