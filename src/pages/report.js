import React, { Component } from "react"
import { connect } from "react-redux"
import { changeCategory } from "../actions/changeCategory"
import { resetEvent } from "../actions/resetEvent"
import { deleteEvent } from "../actions/deleteEvent"
import { resetCategory } from "../actions/resetCategory"

import Layout from "../components/layout"
import weekly from "../components/report.module.scss"
import SEO from "../components/seo"

class Report extends Component {
  constructor() {
    super()
  }
  render() {
    const categories = this.props.events.map((item, index) => {
      return (
        <>
          <div className={weekly.section}>
            <h1>{item.id}</h1>
          </div>
          {item.events.map((event, index) => {
            return (
              <div className={weekly.eventContainer}>
                <div className={weekly.eventHeader}>
                  <h2 className={weekly.eventName}>{event.text}</h2>
                </div>
                <div className={weekly.eventBody}>
                  <p>{event.thisWeek.count}</p>
                </div>
              </div>
            )
          })}{" "}
        </>
      )
    })
    return (
      <Layout>
        <div className="container">{categories}</div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return { events: state.events }
}

export default connect(mapStateToProps)(Report)
