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
      notes: this.props.location.state.notes,
      title: this.props.location.state.title,
    })
  }
  render() {
    const noteTiles = this.state.notes.map((e, i) => (
      <div className={noteStyles.card}>
        <Moment className={noteStyles.timeStamp} format="D MMM YYYY" withTitle>
          {e.time}
        </Moment>
        <FontAwesomeIcon className={noteStyles.pencil} icon={faPencilAlt} />
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
