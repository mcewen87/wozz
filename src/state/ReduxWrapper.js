import React, { Component } from "react"
import { Provider } from "react-redux"
import { createStore as reduxCreateStore } from "redux"
import Spinner from "../components/spinner"
import { silentAuth } from "../utilities/auth"
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

class SessionCheck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  handleCheckSession = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleCheckSession)
  }

  render() {
    const loading = this.state.loading
    if (loading == false) {
      return <React.Fragment>{this.props.children}</React.Fragment>
    }
    if (loading !== false) {
      return <Spinner />
    }
  }
}

export default ({ element }) => (
  <Provider store={createStore()}>
    <SessionCheck>{element}</SessionCheck>
  </Provider>
)
