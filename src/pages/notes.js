import React from "react"
import noteStyles from "../components/noteStyles.module.scss"
import Layout from "../components/layout"
import Moment from "react-moment"

const Notes = ({ location }) => {
  const noteTiles = location.state.notes.map((e, i) => (
    <div className={noteStyles.card}>
      <Moment className={noteStyles.timeStamp} format="D MMM YYYY" withTitle>
        {e.time}
      </Moment>

      <p className={noteStyles.contentStamp}>{e.content}</p>
    </div>
  ))
  return (
    <Layout>
      <div className="container">
        <div className="content">
          <div className={noteStyles.box}>{noteTiles}</div>
        </div>
      </div>
    </Layout>
  )
}

export default Notes