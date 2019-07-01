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
      less: false,
      more: false,
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.submit = this.submit.bind(this)
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

  submit(e) {
    e.preventDefault()
    if (this.state.input < 1) {
      this.setState({ error: true })
      return
    }
    const entryData = {
      category: this.props.category,
      entry: this.state.input,
      thisWeek: moment().format("W"),
      less: this.state.less,
      more: this.state.more,
    }
    this.setState({
      input: "",
      less: false,
      more: false,
    })
    this.props.addEvent(entryData)
  }

  render() {
    const doLess = this.state.less
    const doMore = this.state.more
    return (
      <div className={add.row}>
        <div className={add.main}>
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
          <div className={add.checkHolder}>
            <div className={add.frequencyBox}>
              <p className={add.freq}>Do Less:</p>
              <input
                onChange={this.handleCheck}
                checked={doLess}
                name="less"
                type="checkbox"
              ></input>
            </div>
            <div className={add.frequencyBox}>
              <p className={add.freq}>Do More:</p>
              <input
                onChange={this.handleCheck}
                checked={doMore}
                name="more"
                type="checkbox"
              ></input>
            </div>
            {this.state.error && (
              <p className={add.error}>¯\_(ツ)_/¯ Oops...</p>
            )}
          </div>
        </div>
        <FontAwesomeIcon
          onClick={this.submit}
          className={add.icon}
          icon={faPlusSquare}
        />
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
