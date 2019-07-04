import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import header from "./header.module.scss"
import Headroom from "react-headroom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCogs } from "@fortawesome/free-solid-svg-icons"
import { faChartLine } from "@fortawesome/free-solid-svg-icons"

const Header = () => (
  <Headroom disableInlineStyles="true">
    <div className={header.nav}>
      <div className={header.navDiv}>
        <Link className={header.link} to="/">
          Wozz
        </Link>
        <Link className={header.link} to="/donate">
          Blog
        </Link>
        <Link className={header.link} to="/donate">
          Donate
        </Link>
      </div>
      <div className={header.navDiv}>
        <Link className={header.subLink} to="/report">
          Weekly Report
        </Link>
        <FontAwesomeIcon className={header.icons} icon={faChartLine} />
        <Link className={header.subLink} to="/dashboard">
          Dashboard
        </Link>
        <FontAwesomeIcon className={header.icons} icon={faCogs} />
      </div>
    </div>
  </Headroom>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
