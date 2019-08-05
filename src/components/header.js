import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { login, logout, isAuthenticated, getProfile } from "../utilities/auth"
import header from "./header.module.scss"
import Headroom from "react-headroom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCogs } from "@fortawesome/free-solid-svg-icons"
import { faChartLine } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

class Header extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
    this.openNav = this.openNav.bind(this)
  }

  openNav() {
    this.setState({ open: !this.state.open })
  }
  render() {
    return (
      <Headroom disableInlineStyles="true">
        <div className={header.topnav}>
          <div className={header.rows}>
            <Link className={header.brand} to="/">
              Wozz
            </Link>
            {isAuthenticated() && (
              <>
                {" "}
                <Link
                  onClick={e => {
                    logout()
                    e.preventDefault()
                  }}
                  className={header.logIns}
                  to="/"
                >
                  Logout
                </Link>
                <Link className={header.logIns} to="/dashboard">
                  Dashboard
                </Link>
                <Link className={header.logIns} to="/report">
                  Weekly Report
                </Link>
              </>
            )}
            {!isAuthenticated() && (
              <>
                {" "}
                <Link
                  onClick={e => {
                    login()
                    e.preventDefault()
                  }}
                  className={header.logIns}
                  to="/"
                >
                  LogIn
                </Link>
                <Link
                  onClick={e => {
                    login()
                    e.preventDefault()
                  }}
                  className={header.logIns}
                  to="/"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
          <div className={header.rows}>
            <FontAwesomeIcon
              onClick={this.openNav}
              className={header.bars}
              icon={faBars}
            ></FontAwesomeIcon>
          </div>
        </div>
        {this.state.open && (
          <div className={header.bottomnav}>
            <Link className={header.bottomFirst} to="/">
              The Blog
            </Link>

            <Link className={header.bottom} to="/">
              Donate
            </Link>
          </div>
        )}
      </Headroom>
    )
  }
}

export default Header
