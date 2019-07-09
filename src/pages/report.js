import React, { Component } from "react"
import { connect } from "react-redux"
import { changeCategory } from "../actions/changeCategory"
import { resetEvent } from "../actions/resetEvent"
import { deleteEvent } from "../actions/deleteEvent"
import { resetCategory } from "../actions/resetCategory"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import Moment from "react-moment"
import { Doughnut } from "react-chartjs-2"

import Layout from "../components/layout"
import weekly from "../components/report.module.scss"
import SEO from "../components/seo"

const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
}

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
            const len = event.resetHistory.length - 1
            const resets = event.resetHistory[len]

            return (
              <div className={weekly.eventContainer}>
                <div className={weekly.eventHeader}>
                  <h2 className={weekly.eventName}>{event.text}</h2>
                </div>
                <div className={weekly.eventBody}>
                  <div className={weekly.topGrid}>
                    <div className={weekly.one}>
                      <h3 className={weekly.tileFontLarge}>{resets}</h3>
                      <h4 className={weekly.tileFontSmall}>
                        Total Number of Weekly Resets
                      </h4>
                    </div>
                    <div className={weekly.two}>
                      <div className={weekly.row}>
                        <h3 className={weekly.tileFontLarge}>
                          {event.fluctuation}%
                        </h3>
                        <FontAwesomeIcon
                          className={weekly.arrowUp}
                          icon={faArrowUp}
                        />{" "}
                      </div>
                      <h4 className={weekly.tileFontSmall}>
                        Increase from Last Active Week
                      </h4>
                    </div>
                    <div className={weekly.three}>
                      <h3 className={weekly.tileFontLarge}>
                        <Moment interval={0} fromNow ago>
                          {Date.now() - event.longestDuration}
                        </Moment>
                      </h3>
                      <h4 className={weekly.tileFontSmall}>
                        Longest Duration Between Resets
                      </h4>
                    </div>
                  </div>
                  <Doughnut data={data} />
                </div>
              </div>
            )
          })}{" "}
        </>
      )
    })
    return (
      <Layout>
        <div className="container white">{categories}</div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return { events: state.events }
}

export default connect(mapStateToProps)(Report)
