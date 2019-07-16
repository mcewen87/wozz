import uuid from "uuid"
import moment from "moment"

// text: action.payload.entry,
// less: action.payload.less,
// more: action.payload.more,
// resetHistory: [],
// thisWeek: {
//   value: action.payload.thisWeek,
//   counts: 0,
//   ratings: [action.payload.experience],
// },
// lastWeek: {},

const firstState = [
  {
    id: "Lifestyle",
    title: "Lifestyle",
    events: [
      {
        id: uuid.v4(),
        timestamp: Date.now(),
        text: "Started bookclub.",
        less: true,
        more: false,
        fluctuation: -50,
        highest: 10,
        lowest: 5,
        average: 3,
        resetHistory: [3, 4, 2, 5, 6, 2],
        longestDuration: 0,
        lastWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [100, 33, 15],
        },
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [100, 33, 15],
        },
      },
    ],
  },
  {
    id: "Diet",
    title: "Diet",
    events: [
      {
        id: uuid.v4(),
        timestamp: Date.now(),
        text: "Ate Burger",
        less: false,
        more: true,
        fluctuation: 1,
        highest: 10,
        lowest: 5,
        average: 3,
        resetHistory: [3, 4, 2, 5, 6, 20],
        longestDuration: 0,
        lastWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [10, 2, 5],
        },
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [10, 2, 5],
        },
      },
    ],
  },
  {
    id: "Health",
    title: "Health",
    events: [
      {
        id: uuid.v4(),
        timestamp: Date.now(),
        text: "Barfed",
        less: true,
        more: false,
        resetHistory: [2],
        fluctuation: 19,
        highest: 10,
        lowest: 5,
        average: 3,
        longestDuration: 0,
        lastWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [0, 13, 9],
        },
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [0, 13, 9],
        },
      },
    ],
  },
  {
    id: "Social",
    title: "Social",
    events: [
      {
        id: uuid.v4(),
        timestamp: Date.now(),
        text: "Partied Hard",
        less: false,
        more: true,
        resetHistory: [2],
        fluctuation: 34,
        highest: 10,
        lowest: 5,
        average: 3,
        longestDuration: 0,
        lastWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [13, 5, 8],
        },
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [13, 5, 8],
        },
      },
    ],
  },
]

export default firstState
