import React from "react"
import { Provider } from "react-redux"
import { createStore as reduxCreateStore } from "redux"
import { compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "."

const middleware = [thunk]

const composeEnhancers = compose

const createStore = () =>
  reduxCreateStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  )

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
)
