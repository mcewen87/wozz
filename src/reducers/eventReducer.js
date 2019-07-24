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
      const time = Date.now()
      const initArray = [0, 0, 0]
      initArray[action.payload.experience] = 1
      const newEvent = {
        id: uuid.v4(),
        timestamp: time,
        text: action.payload.entry,
        less: action.payload.less,
        more: action.payload.more,
        resetHistory: [],
        highest: null,
        lowest: null,
        average: null,
        fluctuation: null,
        longestDuration: 0,
        thisWeek: {
          value: action.payload.thisWeek,
          counts: 1,
          ratings: initArray,
          notes: [{ time: time, content: action.payload.note }],
        },
        lastWeek: {},
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
      const resetTime = Date.now()

      const thisWeek =
        action.payload.obj.thisWeek.value === moment().format("W")
          ? true
          : false

      const resetCategory = {
        ...beforeCategory,
        events: beforeCategory.events.map((e, j) => {
          if (e.id === action.payload.obj.id) {
            if (thisWeek && action.payload.note.length > 0) {
              return Object.assign({}, e, {
                timestamp: resetTime,
                thisWeek: {
                  value: moment().format("W"),
                  counts: e.thisWeek.counts + 1,
                  ratings: e.thisWeek.ratings.map((e, i) => {
                    if (i === action.payload.rating) {
                      return e + 1
                    } else {
                      return e
                    }
                  }),
                  notes: [
                    ...(e.thisWeek.notes || []),
                    { time: resetTime, content: action.payload.note },
                  ],
                },
              })
            } else if (!thisWeek && action.payload.note.length > 0) {
              const timeSince = Date.now() - e.timestamp
              const duration =
                timeSince > e.longestDuration ? timeSince : e.longestDuration

              const len = e.resetHistory.length - 1
              const newArray = [...e.resetHistory, e.thisWeek.counts]
              const average = Math.floor(
                newArray.reduce((a, b) => a + b) / newArray.length
              )
              const variance =
                ((e.thisWeek.counts - e.resetHistory[len]) /
                  e.resetHistory[len]) *
                100
              return Object.assign({}, e, {
                timestamp: Date.now(),
                highest: Math.max(...newArray),
                lowest: Math.min(...newArray),
                average: average,
                fluctuation: variance,
                longestDuration: duration,
                lastWeek: e.thisWeek,
                resetHistory: [...e.resetHistory, e.thisWeek.counts],
                thisWeek: {
                  value: moment().format("w"),
                  counts: 1,
                  ratings: [],
                  notes: [{ time: resetTime, content: action.payload.note }],
                },
              })
            } else if (thisWeek && action.payload.note.length == 0) {
              return Object.assign({}, e, {
                timestamp: resetTime,
                thisWeek: {
                  value: moment().format("W"),
                  counts: e.thisWeek.counts + 1,
                  ratings: e.thisWeek.ratings.map((e, i) => {
                    if (i === action.payload.rating) {
                      return e + 1
                    } else {
                      return e
                    }
                  }),
                  notes: e.thisWeek.notes,
                },
              })
            } else if (!thisWeek && action.payload.note.length == 0) {
              const timeSince = Date.now() - e.timestamp
              const duration =
                timeSince > e.longestDuration ? timeSince : e.longestDuration

              const len = e.resetHistory.length - 1
              const newArray = [...e.resetHistory, e.thisWeek.counts]
              const average = Math.floor(
                newArray.reduce((a, b) => a + b) / newArray.length
              )
              const variance =
                ((e.thisWeek.counts - e.resetHistory[len]) /
                  e.resetHistory[len]) *
                100
              return Object.assign({}, e, {
                timestamp: Date.now(),
                highest: Math.max(...newArray),
                lowest: Math.min(...newArray),
                average: average,
                fluctuation: variance,
                longestDuration: duration,
                lastWeek: e.thisWeek,
                resetHistory: [...e.resetHistory, e.thisWeek.counts],
                thisWeek: {
                  value: moment().format("w"),
                  counts: 1,
                  ratings: [],
                  notes: [],
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
