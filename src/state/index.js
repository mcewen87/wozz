// import { combineReducers } from "redux"
// import app from "./app"

// export default combineReducers({ app })

import { combineReducers } from "redux"
import categoryReducer from "../reducers/categoryReducer"
import eventReducer from "../reducers/eventReducer"

export default combineReducers({
  activeCategory: categoryReducer,
  events: eventReducer,
})
