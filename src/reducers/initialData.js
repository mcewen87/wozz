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
        resetHistory: [3, 4, 2, 5, 6, 2],
        lastWeek: {},
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [],
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
        text: "Started bookclub.",
        less: true,
        more: false,
        resetHistory: [12, 46, 74, 1, 4, 6, 21, 1, 1],
        lastWeek: {},
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [],
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
        text: "Started bookclub.",
        less: true,
        more: false,
        resetHistory: [],
        lastWeek: {},
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [],
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
        text: "Started bookclub.",
        less: true,
        more: false,
        resetHistory: [],
        lastWeek: {},
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
          ratings: [],
        },
      },
    ],
  },
]

export default firstState
