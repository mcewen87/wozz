import React, { Component } from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import Layout from "../components/layout"
import Welcome from "../components/welcome"
import Spinner from "../components/spinner"
import Image from "../components/image"
import SEO from "../components/seo"
import Tracker from "../components/tracker"
import { getData } from "../actions/getData"
import firstState from "../reducers/initialData"
import { login, logout, isAuthenticated, getProfile } from "../utilities/auth"

class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      use: false,
    }
  }
  componentDidMount() {
    const check = localStorage.getItem("isLoggedIn")

    const eventData = JSON.parse(localStorage.getItem("events"))

    if (eventData !== null) {
      this.props.getData({
        events: eventData,
      })
      setTimeout(
        function() {
          this.setState({ isLoading: false, use: check })
        }.bind(this),
        1200
      )
    } else {
      console.log(firstState)
      this.props.getData({
        events: firstState,
      })
      setTimeout(
        function() {
          this.setState({ isLoading: false, use: check })
        }.bind(this),
        1200
      )
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Layout>
          <Spinner />
        </Layout>
      )
    } else if (!isAuthenticated()) {
      return (
        <Layout>
          <Welcome />
        </Layout>
      )
    } else if (isAuthenticated()) {
      return (
        <Layout>
          <Tracker />
        </Layout>
      )
    }
  }
}

export default connect(
  null,
  { getData }
)(IndexPage)
