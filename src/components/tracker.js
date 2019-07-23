import React, { Component } from "react"
import { connect } from "react-redux"
import { changeCategory } from "../actions/changeCategory"
import { resetEvent } from "../actions/resetEvent"
import { deleteEvent } from "../actions/deleteEvent"
import { resetCategory } from "../actions/resetCategory"
import ReactCSSTransitionGroup from "react-addons-css-transition-group" // ES6
import Modal from "react-modal"
import { Link } from "gatsby"
import Moment from "react-moment"
import "../main.scss"

import tracker from "./tracker.module.scss"
import Submit from "./submit"
import Add from "./add"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"

const customStyles = {
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    border: "none",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "100vh",
    transform: "translate(-50%, -50%)",
    backgroundColor: "##ffffff",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "##ffffff",
  },
}

class Tracker extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      selectedEvent: {},
      experience: 2,
      note: "",
    }
    this.changeCat = this.changeCat.bind(this)
    this.resetEvent = this.resetEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.setRating = this.setRating.bind(this)

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value, error: false })
  }

  openModal(event) {
    this.setState({ modalIsOpen: true, selectedEvent: event })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  setRating(value) {
    this.setState({ experience: value })
  }
  changeCat(id) {
    this.props.changeCategory(id)
  }

  resetEvent() {
    this.setState({ modalIsOpen: false })
    this.props.resetEvent({
      obj: this.state.selectedEvent,
      note: this.state.note,
      rating: this.state.experience,
      category: this.props.category,
    })
  }
  deleteEvent(index) {
    if (window.confirm("Are you sure you want to delete this event?")) {
      this.props.deleteEvent({
        index: index,
        category: this.props.category,
      })
    }
  }

  render() {
    const { open } = this.state
    if (this.props.events.length > 0) {
      const categoryId =
        this.props.category > this.props.events.length - 1
          ? 0
          : this.props.category

      const categoryThread = this.props.events.find((c, i) => i === categoryId)

      const makeNumbers = () => {
        let list = ["Positive", "Negative", "Neutral"]
        let numbers = list.map((e, i) => {
          if (this.state.experience == i) {
            return (
              <div
                onClick={() => {
                  this.setRating(i)
                }}
                className={tracker.numTileSelected}
              >
                <h3 className={tracker.rankingSelected}>{e}</h3>
              </div>
            )
          } else {
            return (
              <div
                onClick={() => {
                  this.setRating(i)
                }}
                className={tracker.numTile}
              >
                <h3 className={tracker.ranking}>{e}</h3>
              </div>
            )
          }
        })
        return numbers
      }

      const events = categoryThread.events.map((e, index) => {
        return (
          <div key={index} className={tracker.card}>
            <h3 className={tracker.eventName}>{e.text}</h3>
            <div className={tracker.dataRow}>
              <h2 className={tracker.reset}>Frequency Preference: </h2>
              {e.less && <h3 className={tracker.since}>Less</h3>}
              {e.more && <h3 className={tracker.since}>More</h3>}
              {!e.less && !e.more && <h3 className={tracker.since}>None</h3>}
            </div>
            <div className={tracker.dataRow}>
              <h2 className={tracker.reset}>Last Occurrence: </h2>
              <h3 className={tracker.since}>
                <Moment fromNow>{e.timestamp}</Moment>
              </h3>
            </div>
            <div className={tracker.dataRow}>
              {" "}
              <h2 className={tracker.reset}>Weekly Count: </h2>{" "}
              <h3 className={tracker.since}>{e.thisWeek.counts}</h3>
            </div>

            {e.thisWeek.notes && (
              <Link
                to="/notes"
                state={{ notes: e.thisWeek && e.thisWeek.notes }}
              >
                <div className={tracker.cornerRow}>
                  <p className={tracker.viewNotes}>View Notes</p>
                  <FontAwesomeIcon
                    className={tracker.arrowRight}
                    icon={faLongArrowAltRight}
                  ></FontAwesomeIcon>
                </div>
              </Link>
            )}

            <div className={tracker.buttonBar}>
              <button
                className={tracker.trackers}
                onClick={() => {
                  this.openModal(e)
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
        )
      })

      const index = categoryId
      const cat = this.props.events[index].id

      const tiles = this.props.events.map((c, i) => {
        const style = index === i ? tracker.innerSelected : tracker.innerBlock

        return (
          <div onClick={() => this.changeCat(i)} className={style}>
            <h3 className={tracker.blockTitle}>{c.id}</h3>
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
                <div className="content">
                  <h3 className={tracker.question}>
                    How would you rank your experience?
                  </h3>
                  <div className={tracker.rankingBox}>{makeNumbers()}</div>
                  <h3 className={tracker.question}>Add an optional note:</h3>
                  <textarea
                    placeholder="350 characters or less.."
                    onChange={this.handleInput}
                    type="text"
                    name="note"
                    value={this.state.note}
                    className={tracker.inputSmall}
                  />

                  <div
                    onClick={this.closeModal}
                    className={tracker.cancelContainer}
                  >
                    <h3 className={tracker.submitText}>Cancel</h3>
                  </div>
                  <div
                    onClick={this.resetEvent}
                    className={tracker.submitContainer}
                  >
                    <h3 className={tracker.submitText}>Submit</h3>
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
