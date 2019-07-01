import React, { Component } from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import Layout from "../components/layout"
import Welcome from "../components/welcome"
import Image from "../components/image"
import SEO from "../components/seo"
import Tracker from "../components/tracker"
import { getData } from "../actions/getData"
import firstState from "../reducers/initialData"

class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      use: false,
      first: true,
    }
    this.toggleUse = this.toggleUse.bind(this)
  }
  componentDidMount() {
    const check = localStorage.getItem("use")
    const eventData = JSON.parse(localStorage.getItem("events"))
    console.log(eventData !== null)
    this.setState({ use: check })
    if (eventData !== null) {
      this.props.getData({
        events: eventData,
      })
    } else {
      console.log(firstState)
      this.props.getData({
        events: firstState,
      })
    }
  }
  toggleUse() {
    this.setState({ use: true })
  }
  render() {
    return (
      <div>
        <SEO title="Home" />

        <Layout>
          {!this.state.use && <Welcome sendUse={this.toggleUse} />}
          {this.state.use && <Tracker />}
        </Layout>
      </div>
    )
  }
}

export default connect(
  null,
  { getData }
)(IndexPage)
