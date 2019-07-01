import uuid from "uuid"
import moment from "moment"

const firstState = [
  {
    id: "Lifestyle",
    title: "Lifestyle",
    events: [
      {
        text: "Started bookclub.",
        timestamp: Date.now(),
        id: uuid.v4(),
        lastWeek: {},
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
        },
      },
    ],
  },
  {
    id: "Diet",
    title: "Diet",
    events: [
      {
        text: "Went to In-N-Out.",
        timestamp: Date.now(),
        id: uuid.v4(),
        lastWeek: {},
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
        },
      },
    ],
  },
  {
    id: "Health",
    title: "Health",
    events: [
      {
        text: "Jogged around the apartment complex.",
        timestamp: Date.now(),
        id: uuid.v4(),
        lastWeek: {},
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
        },
      },
    ],
  },
  {
    id: "Social",
    title: "Social",
    events: [
      {
        text: "Went out for drinks after work",
        timestamp: Date.now(),
        id: uuid.v4(),
        lastWeek: {},
        thisWeek: {
          value: moment().format("W"),
          counts: 0,
        },
      },
    ],
  },
]

export default firstState
