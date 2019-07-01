import React, { Component } from "react"
import { connect } from "react-redux"
import { deleteCategory } from "../actions/deleteCategory"
import { addCategory } from "../actions/addCategory"
import dashboard from "../components/dashboard.module.scss"
import CategorySelect from "../components/categorySelect"
import Layout from "../components/layout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      category: "",
      error: false,
    }
    this.handleInput = this.handleInput.bind(this)
    this.deleteCat = this.deleteCat.bind(this)
    this.submit = this.submit.bind(this)
    this.submitOption = this.submitOption.bind(this)
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value })
    if (this.state.category.length > 9) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
    }
  }

  submitOption(option) {
    let events = this.props.events
    for (let i = 0; i < events.length; i++) {
      if (option.value === events[i].id) {
        alert("You've already added" + " " + option.value + " as a category.")
        return
      }
    }
    if (option === null) {
      alert("Please Make a Selection.")
    } else {
      const category = {
        id: option.value,
        title: option.value,
        events: [],
      }
      this.props.addCategory(category)
    }
  }

  deleteCat(i) {
    if (
      window.confirm(
        "Are you sure you want to remove this category and its contents?"
      )
    ) {
      this.props.deleteCategory(i)
    }
  }

  submit(e) {
    e.preventDefault()
    const category = {
      id: this.state.category,
      title: this.state.category,
      events: [],
    }
    if (!this.state.error) {
      this.props.addCategory(category)
      this.setState({
        category: "",
      })
    } else {
      alert("Your entry is too long.")
    }
  }
  render() {
    const categoryBlocks = this.props.events.map(c => (
      <div className={dashboard.catBlock}>
        <h1 className={dashboard.catName}>{c.id}</h1>
        <FontAwesomeIcon
          onClick={() => this.deleteCat(c.id)}
          className={dashboard.remove}
          icon={faTrash}
        />
      </div>
    ))
    return (
      <Layout>
        <div className="container">
          <div className="content">
            <div className={dashboard.infoBlock}>
              <div className={dashboard.boxTitle}>Wozz Categories</div>

              <CategorySelect sendOption={this.submitOption} />
              <div className={dashboard.rows}>{categoryBlocks}</div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return { category: state.activeCategory, events: state.events }
}

export default connect(
  mapStateToProps,
  { deleteCategory, addCategory }
)(Dashboard)
