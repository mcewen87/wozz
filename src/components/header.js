// import { Link } from "gatsby"
// import PropTypes from "prop-types"
// import React from "react"
// import header from "./header.module.scss"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

// const Header = () => (
//   <header>
//     <div className={header.navBar}>
//       <ul>
//         <li>
//           <Link className={header.linkFirst} to="/">
//             Wozz
//             <FontAwesomeIcon className={header.down} icon={faChevronDown} />
//           </Link>
//           <ul className={header.hidden}>
//             <li>
//               <Link className={header.dropDownLink} to="/report">
//                 Weekly Report
//               </Link>
//             </li>
//             <li>
//               <Link className={header.dropDownLink} to="/dashboard">
//                 Dashboard
//               </Link>
//             </li>
//           </ul>
//         </li>

//         <li>
//           <Link className={header.link} to="/donate">
//             Blog
//           </Link>
//         </li>
//         <li>
//           <Link className={header.link} to="/donate">
//             Donate
//           </Link>
//         </li>
//       </ul>
//     </div>
//   </header>
// )

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

// export default Header

import React from "react"
import { Link } from "gatsby"
import header from "./header.module.scss"
import { slide as Menu } from "react-burger-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

export default props => {
  return (
    <Menu>
      <Link className={header.linkFirst} to="/">
        Wozz
        <FontAwesomeIcon className={header.down} icon={faChevronDown} />
      </Link>
      <Link className={header.linkTwo} to="/">
        Weekly Report
      </Link>
      <Link className={header.linkTwo} to="/dashboard">
        Dashboard
      </Link>

      <Link className={header.link} to="/blog">
        Blog
      </Link>
      <Link className={header.link} to="/donate">
        Donate
      </Link>
    </Menu>
  )
}
