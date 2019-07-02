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

class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      use: false,
    }
    this.toggleUse = this.toggleUse.bind(this)
  }
  componentDidMount() {
    const check = localStorage.getItem("use")
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
  toggleUse() {
    this.setState({ use: true })
  }
  render() {
    if (this.state.isLoading) {
      return <Spinner />
    } else {
      return (
        <Layout>
          {!this.state.use && <Welcome sendUse={this.toggleUse} />}
          {this.state.use && <Tracker />}
        </Layout>
      )
    }
  }
}

export default connect(
  null,
  { getData }
)(IndexPage)
