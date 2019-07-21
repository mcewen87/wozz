import React, { Component } from "react"
import { connect } from "react-redux"
import { changeCategory } from "../actions/changeCategory"
import { resetEvent } from "../actions/resetEvent"
import { deleteEvent } from "../actions/deleteEvent"
import { resetCategory } from "../actions/resetCategory"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"

import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import Moment from "react-moment"
import { Doughnut, Bar, Line } from "react-chartjs-2"
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

            const dataExperience = {
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
            const dataNumbers = {
              labels: ["Highest", "Average", "Lowest"],
              datasets: [
                {
                  label: "Weekly Wrap Up",
                  data: [event.highest, event.average, event.lowest],
                  borderColor: "#ffffff",
                  backgroundColor: ["#247ba0", "#f25f5c", "#ffe066"],
                  hoverBackgroundColor: ["#ffffff", "#ffffff", "#ffffff"],
                },
              ],
            }

            return (
              <div className={weekly.eventContainer}>
                {event.resetHistory.length >= 2 && (
                  <div className={weekly.eventHeader}>
                    <h2 className={weekly.eventName}>
                      <FontAwesomeIcon icon={faStar} className={weekly.star} />
                      {event.text}
                    </h2>

                    <div className={weekly.row}>
                      <div className={weekly.topGrid}>
                        {event.less && event.lowest > resets && (
                          <div className={weekly.tileCongrats}>
                            <FontAwesomeIcon
                              className={weekly.thumbsUp}
                              icon={faThumbsUp}
                            />{" "}
                            <h4 className={weekly.tileFontSmall}>
                              You set an all time low frequency record! Keep up
                              the good work!
                            </h4>
                          </div>
                        )}
                        {event.more && event.highest < resets && (
                          <div className={weekly.tileCongrats}>
                            <FontAwesomeIcon
                              className={weekly.thumbsUp}
                              icon={faThumbsUp}
                            />{" "}
                            <h4 className={weekly.tileFontSmall}>
                              You set an all time high frequency record! Keep up
                              the good work!
                            </h4>
                          </div>
                        )}
                        <div className={weekly.tile}>
                          <h3 className={weekly.tileFontLarge}>{resets}</h3>
                          <h4 className={weekly.tileFontSmall}>
                            Total Weekly Count
                          </h4>
                        </div>

                        {Math.sign(event.fluctuation) == -1 && (
                          <div className={weekly.tile}>
                            <div className={weekly.row}>
                              <h3 className={weekly.tileFontLarge}>
                                {Math.abs(event.fluctuation)}%
                              </h3>
                            </div>
                            <h4 className={weekly.tileFontSmall}>
                              Decrease from Last Active Week
                            </h4>
                          </div>
                        )}

                        {Math.sign(event.fluctuation) == 1 && (
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
                        )}

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
                        <div className={weekly.tileData}>
                          <div className={weekly.tileHeader}>
                            <h3 className={weekly.experienceText}>
                              Experience Report
                            </h3>
                          </div>
                          <HorizontalBar data={dataExperience} />
                        </div>
                        <div className={weekly.tileData}>
                          <div className={weekly.tileHeader}>
                            <h3 className={weekly.experienceText}>
                              All Time Reset History
                            </h3>
                          </div>
                          <Line data={dataNumbers} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {event.resetHistory.length == 0 && (
                  <div className={weekly.eventHeader}>
                    <h2 className={weekly.eventName}>
                      <FontAwesomeIcon icon={faStar} className={weekly.star} />
                      {event.text}
                    </h2>
                    <div className={weekly.ldsPacman}>
                      <div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <p className={weekly.gatheringData}>
                      Wozz is still gathering data on this entry. Keep it active
                      and check back in two weeks.
                    </p>
                  </div>
                )}
                {event.resetHistory.length == 1 && (
                  <div className={weekly.eventHeader}>
                    <h2 className={weekly.eventName}>
                      <FontAwesomeIcon icon={faStar} className={weekly.star} />
                      {event.text}
                    </h2>
                    <div className={weekly.ldsPacman}>
                      <div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <p className={weekly.gatheringData}>
                      Wozz is still gathering data on this entry. Keep it active
                      and check back in one week.
                    </p>
                  </div>
                )}
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
