/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import layout from "./layout.module.scss"
import "../main.scss"

const Layout = ({ children }) => (
  <div className={layout.container}>
    <Header />
    <div className={layout.content}>{children}</div>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
