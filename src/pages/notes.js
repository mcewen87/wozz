import React, { Component } from "react"
import noteStyles from "../components/noteStyles.module.scss"
import Layout from "../components/layout"
import Moment from "react-moment"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

class Notes extends Component {
  constructor() {
    super()
    this.state = {
      notes: [],
    }
  }
  componentDidMount() {
    this.setState({
      notes: this.props.location.state.notes.reverse(),
      title: this.props.location.state.title,
    })
  }
  render() {
    const noteTiles = this.state.notes.map((e, i) => (
      <div className={noteStyles.container}>
        <Moment className={noteStyles.timeStamp} format="LLLL" withTitle>
          {e.time}
        </Moment>
        <div className={noteStyles.card}></div>
        <p className={noteStyles.contentStamp}>{e.content}</p>
      </div>
    ))

    return (
      <Layout>
        <div className="container">
          <div className={noteStyles.box}>
            <div className="content">
              {" "}
              <h2 className={noteStyles.title}>{this.state.title}</h2>
              {noteTiles}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Notes
