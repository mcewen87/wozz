import React, { Component } from "react"
import { connect } from "react-redux"
import { changeCategory } from "../actions/changeCategory"
import { resetEvent } from "../actions/resetEvent"
import { deleteEvent } from "../actions/deleteEvent"
import { resetCategory } from "../actions/resetCategory"
import Moment from "react-moment"
import "../main.scss"
import tracker from "./tracker.module.scss"
import Add from "./add"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"

class Tracker extends Component {
  constructor() {
    super()
    this.changeCat = this.changeCat.bind(this)
    this.resetEvent = this.resetEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
  }
  changeCat(id) {
    this.props.changeCategory(id)
  }

  resetEvent(event) {
    this.props.resetEvent({
      obj: event,
      category: this.props.category,
    })
  }
  deleteEvent(index) {
    this.props.deleteEvent({
      index: index,
      category: this.props.category,
    })
  }

  render() {
    if (this.props.events.length > 0) {
      const categoryId =
        this.props.category > this.props.events.length - 1
          ? 0
          : this.props.category

      const categoryThread = this.props.events.find((c, i) => i === categoryId)

      const events = categoryThread.events.map((e, index) => {
        return (
          <div className={tracker.card}>
            <h3 className={tracker.eventName}>{e.text}</h3>
            <h3 className={tracker.since}>
              <Moment fromNow>{e.timestamp}</Moment>
            </h3>

            <div className={tracker.row}>
              <h2 className={tracker.reset}>
                Reset <span>{e.thisWeek.counts}</span> times this week.
              </h2>
              <div>
                <button
                  className={tracker.trackers}
                  onClick={() => {
                    this.resetEvent(e)
                  }}
                >
                  Reset
                </button>
                <button
                  className={tracker.trackers}
                  onClick={() => {
                    this.deleteEvent(index)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      })

      const index = categoryId
      const cat = this.props.events[index].id

      const tiles = this.props.events.map((c, i) => {
        const style = index === i ? tracker.innerSelected : tracker.innerBlock

        return (
          <div onClick={() => this.changeCat(i)} className={tracker.block}>
            <div className={style}>
              <h3 className={tracker.blockTitle}>{c.id}</h3>
            </div>
          </div>
        )
      })
      return (
        <div className="container">
          <div className="content">
            <p className={tracker.brilliant}>You're brilliant, kid</p>

            <Add />
            <div className={tracker.navBar}>{tiles}</div>

            {events}
          </div>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="content">
          <h1>
            To add events, go to your dashboard and create a few categories.{" "}
          </h1>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { category: state.activeCategory, events: state.events }
}

export default connect(
  mapStateToProps,
  { changeCategory, deleteEvent, resetEvent, resetCategory }
)(Tracker)
