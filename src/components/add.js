import React, { Component } from "react"
import add from "./add.module.scss"
import { addEvent } from "../actions/addEvent"
import moment from "moment"
import { connect } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons"

class Add extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      error: false,
      note: "",
      noteOpen: false,
      less: false,
      more: false,
      experience: 2,
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleExp = this.handleExp.bind(this)
    this.submit = this.submit.bind(this)
    this.openNote = this.openNote.bind(this)
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value, error: false })
  }

  handleCheck(e) {
    if (e.target.name === "less") {
      this.setState({ less: !this.state.less, more: false })
    } else {
      this.setState({ less: false, more: !this.state.more })
    }
  }

  handleExp(e) {
    if (e.target.name === "Positive") {
      this.setState({ experience: 0 })
    } else if (e.target.name === "Negative") {
      this.setState({ experience: 1 })
    } else {
      this.setState({ experience: 2 })
    }
  }

  openNote() {
    this.setState({ noteOpen: !this.state.noteOpen })
  }
  submit(e) {
    e.preventDefault()
    if (this.state.input.length < 1 || this.state.note.length > 120) {
      this.setState({ error: true })
      return
    }
    const entryData = {
      category: this.props.category,
      entry: this.state.input,
      note: this.state.note,
      thisWeek: moment().format("W"),
      less: this.state.less,
      more: this.state.more,
      experience: this.state.experience,
    }
    this.setState({
      input: "",
      less: false,
      more: false,
      experience: 2,
    })
    this.props.addEvent(entryData)
  }

  render() {
    const doLess = this.state.less
    const doMore = this.state.more
    const exp = this.state.experience
    return (
      <div className={add.main}>
        <div className={add.row}>
          <form onSubmit={this.submit} className={add.form}>
            <input
              onChange={this.handleInput}
              placeholder="I recently..."
              type="text"
              name="input"
              value={this.state.input}
              className={add.input}
            />
          </form>
          <FontAwesomeIcon
            onClick={this.submit}
            className={add.icon}
            icon={faPlusSquare}
          />
        </div>
        <div className={add.checkHolder}>
          <p className={add.freq}>I want to do this: </p>
          <div className={add.frequencyBox}>
            <input
              onChange={this.handleCheck}
              checked={doLess}
              name="less"
              type="checkbox"
            ></input>
            <p className={add.freqOpt}>Less</p>
          </div>
          <div className={add.frequencyBox}>
            <input
              onChange={this.handleCheck}
              checked={doMore}
              name="more"
              type="checkbox"
            ></input>
            <p className={add.freqOpt}>More</p>
          </div>
          {this.state.error && <p className={add.error}>¯\_(ツ)_/¯ Oops...</p>}
        </div>
        <div className={add.row}>
          <div className={add.checkHolderTwo}>
            <p className={add.freq}>My experience was:</p>
            <div className={add.frequencyBox}>
              <input
                onChange={this.handleExp}
                checked={exp == 0}
                name="Positive"
                type="checkbox"
              ></input>
              <p className={add.freqOpt}>Positive</p>
            </div>
            <div className={add.frequencyBox}>
              <input
                onChange={this.handleExp}
                checked={exp == 1}
                name="Negative"
                type="checkbox"
              ></input>
              <p className={add.freqOpt}>Negative</p>
            </div>
            <div className={add.frequencyBox}>
              <input
                onChange={this.handleExp}
                checked={exp == 2}
                name="Neutral"
                type="checkbox"
              ></input>
              <p className={add.freqOpt}>Neutral</p>
            </div>
          </div>
          <p onClick={this.openNote} className={add.blue}>
            add note +
          </p>
        </div>
        {this.state.noteOpen && (
          <textarea
            placeholder="120 characters or less.."
            onChange={this.handleInput}
            type="text"
            name="note"
            value={this.state.note}
            className={add.inputSmall}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { category: state.activeCategory, events: state.events }
}

export default connect(
  mapStateToProps,
  { addEvent }
)(Add)
