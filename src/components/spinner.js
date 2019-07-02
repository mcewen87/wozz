import React, { Component } from "react"
import spinner from "./spinner.module.scss"

class Spinner extends Component {
  constructor() {
    super()
  }

  render() {
    const style = {
      width: "100%",
      height: "100%",
    }
    return (
      <div className={spinner.page}>
        <div className={spinner.ldsbricks}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default Spinner
