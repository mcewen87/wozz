import {
  ADD_EVENT,
  RESET_EVENT,
  DELETE_EVENT,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  GET_DATA,
} from "../actions/types"
import firstState from "./initialData"
import updateEventState from "./helperFunctions/updateEventState"
import saveData from "./helperFunctions/saveData"
import uuid from "uuid"
import moment from "moment"

// if (localStorage.getItem("fixed")) {
//   console.log("Items Cleared")
// } else {
//   console.log("Added Fixed")
//   localStorage.clear()
//   localStorage.setItem("fixed", JSON.stringify("true"))
// }

// const localData = JSON.parse(localStorage.getItem("events"))

const initialState = firstState

export default function handleEvents(state = [], action) {
  switch (action.type) {
    case ADD_EVENT:
      const newEvent = {
        text: action.payload.entry,
        less: action.payload.less,
        more: action.payload.more,

        timestamp: Date.now(),
        thisWeek: {
          value: action.payload.thisWeek,
          counts: 0,
          ratings: [action.payload.experience],
        },
        lastWeek: {},
        id: uuid.v4(),
      }
      const categoryIndex = action.payload.category
      const oldCategory = state[categoryIndex]
      const newCategory = {
        ...oldCategory,
        events: oldCategory.events.concat(newEvent),
      }

      saveData("events", [
        ...state.slice(0, categoryIndex),
        newCategory,
        ...state.slice(categoryIndex + 1, state.length),
      ])

      return updateEventState(state, categoryIndex, newCategory)

    case RESET_EVENT:
      const position = action.payload.category
      const beforeCategory = state[position]

      const thisWeek =
        action.payload.obj.thisWeek.value === moment().format("W")
          ? true
          : false

      const resetCategory = {
        ...beforeCategory,
        events: beforeCategory.events.map((e, j) => {
          if (e.id === action.payload.obj.id) {
            if (thisWeek) {
              return Object.assign({}, e, {
                timestamp: Date.now(),
                thisWeek: {
                  value: moment().format("W"),
                  counts: e.thisWeek.counts + 1,
                  ratings: e.thisWeek.ratings.concat(action.payload.rating),
                },
              })
            } else {
              return Object.assign({}, e, {
                timestamp: Date.now(),
                lastWeek: e.thisWeek,
                thisWeek: {
                  value: moment().format("w"),
                  counts: 0,
                  ratings: [],
                },
              })
            }
          } else {
            return e
          }
        }),
      }

      saveData("events", [
        ...state.slice(0, position),
        resetCategory,
        ...state.slice(position + 1, state.length),
      ])

      return updateEventState(state, position, resetCategory)

    case DELETE_EVENT:
      const index = action.payload.category
      const prevCategory = state[index]

      const updatedCategory = {
        ...prevCategory,
        events: prevCategory.events.filter((e, i) => {
          return i !== action.payload.index
        }),
      }

      saveData("events", [
        ...state.slice(0, index),
        updatedCategory,
        ...state.slice(index + 1, state.length),
      ])

      return updateEventState(state, index, updatedCategory)

    case ADD_CATEGORY:
      const prevCategories = state
      const updatedCategories = prevCategories.concat(action.payload)
      saveData("events", updatedCategories)

      return updatedCategories

    case DELETE_CATEGORY:
      const oldCategories = state

      const newCategories = oldCategories.filter(c => {
        return c.id !== action.payload
      })

      saveData("events", newCategories)
      return newCategories

    case GET_DATA:
      return action.data.events

    default:
      return state
  }
}
