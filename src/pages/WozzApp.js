//REACT AND AUTH
import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utilities/auth"
import { Link } from "gatsby"

//DESIGN AND COMPONENTS
import Layout from "../components/layout"
import Tracker from "../components/tracker"
import Spinner from "../components/spinner"
import SEO from "../components/seo"

//REDUX
import { connect } from "react-redux"

const wozz = () => {
  if (!isAuthenticated()) {
    login()
    return <Spinner />
  }

  const user = getProfile()

  return (
    <Layout>
      <SEO title="Wozz" />
      <a
        href="#logout"
        onClick={e => {
          logout()
          e.preventDefault()
        }}
      >
        Log Out
      </a>
    </Layout>
  )
}

export default wozz
