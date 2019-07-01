import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Welcome from "../components/welcome"
import Image from "../components/image"
import SEO from "../components/seo"
import Tracker from "../components/tracker"

class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      use: false,
    }
    this.toggleUse = this.toggleUse.bind(this)
  }
  toggleUse() {
    this.setState({ use: true })
  }
  render() {
    const use = localStorage.getItem("use")
    return (
      <div>
        <SEO title="Home" />

        <Layout>
          {!use && <Welcome sendUse={this.toggleUse} />}
          {use && <Tracker />}
        </Layout>
      </div>
    )
  }
}

export default IndexPage
