import React, { Component } from "react"
import { connect } from "react-redux"
import { changeCategory } from "../actions/changeCategory"
import { resetEvent } from "../actions/resetEvent"
import { deleteEvent } from "../actions/deleteEvent"
import { resetCategory } from "../actions/resetCategory"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import Moment from "react-moment"
import { Doughnut, Bar } from "react-chartjs-2"
import { HorizontalBar } from "react-chartjs-2"
import { Polar } from "react-chartjs-2"
import { Pie } from "react-chartjs-2"

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
            <h1 className={weekly.categoryName}>{item.id}</h1>
          </div>
          <hr className={weekly.horizontal}></hr>
          {item.events.map((event, index) => {
            const len = event.resetHistory.length - 1
            const resets = event.resetHistory[len]

            const array = event.lastWeek.ratings

            const data = {
              labels: ["Positive", "Negative", "Neutral"],
              datasets: [
                {
                  label: "Weekly Wrap Up",
                  data: array,
                  borderColor: "#ffffff",
                  backgroundColor: ["#247ba0", "#f25f5c", "#ffe066"],
                  hoverBackgroundColor: ["#ffffff", "#ffffff", "#ffffff"],
                },
              ],
            }

            return (
              <div className={weekly.eventContainer}>
                <div className={weekly.eventHeader}>
                  <h2 className={weekly.eventName}>{event.text}</h2>
                  <div className={weekly.row}>
                    <div className={weekly.topGrid}>
                      <div className={weekly.tile}>
                        <h3 className={weekly.tileFontLarge}>{resets}</h3>
                        <h4 className={weekly.tileFontSmall}>
                          Total Number of Weekly Resets
                        </h4>
                      </div>
                      <div className={weekly.tile}>
                        <div className={weekly.row}>
                          <h3 className={weekly.tileFontLarge}>
                            {event.fluctuation}%
                          </h3>
                        </div>
                        <h4 className={weekly.tileFontSmall}>
                          Increase from Last Active Week
                        </h4>
                      </div>
                      <div className={weekly.tile}>
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
                  </div>
                </div>
                <div className={weekly.eventBody}>
                  <div className={weekly.gridNoGap}>
                    <div className={weekly.experience}>
                      <h2 className={weekly.experienceTitle}>Experience:</h2>
                    </div>
                    <div className={weekly.twoSplit}>
                      <HorizontalBar data={data} />
                    </div>
                  </div>
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
