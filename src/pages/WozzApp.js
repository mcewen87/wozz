import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Tracker from "../components/tracker"
import SEO from "../components/seo"

import { connect } from "react-redux"

const WozzApp = () => (
  <Layout>
    <SEO title="Page two" />
    <Tracker />
  </Layout>
)

export default WozzApp