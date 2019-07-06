import React, { Component } from "react"
import { connect } from "react-redux"
import { changeCategory } from "../actions/changeCategory"
import { resetEvent } from "../actions/resetEvent"
import { deleteEvent } from "../actions/deleteEvent"
import { resetCategory } from "../actions/resetCategory"
import ReactCSSTransitionGroup from "react-addons-css-transition-group" // ES6
import Modal from "react-modal"
import Moment from "react-moment"
import "../main.scss"

import tracker from "./tracker.module.scss"
import Submit from "./submit"
import Add from "./add"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

class Tracker extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
    }
    this.changeCat = this.changeCat.bind(this)
    this.resetEvent = this.resetEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }
  changeCat(id) {
    this.props.changeCategory(id)
  }

  resetEvent(event) {
    this.setState({ modalIsOpen: true })
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
    const { open } = this.state
    if (this.props.events.length > 0) {
      const categoryId =
        this.props.category > this.props.events.length - 1
          ? 0
          : this.props.category

      const categoryThread = this.props.events.find((c, i) => i === categoryId)

      const events = categoryThread.events.map((e, index) => {
        return (
          <div key={index} className={tracker.card}>
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

            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1300}
              transitionLeaveTimeout={200}
            >
              {events}
            </ReactCSSTransitionGroup>
            <div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className={tracker.full}>
                  <div>
                    <h3 className={tracker.prompt}>How was your experience?</h3>
                    <button className={tracker.rank}>Positive</button>
                    <button className={tracker.rank}>Neutral</button>
                    <button className={tracker.rank}>Negative</button>
                    <button className={tracker.rank}>Not Applicable</button>
                    <button
                      onClick={this.closeModal}
                      className={tracker.rankSub}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
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
