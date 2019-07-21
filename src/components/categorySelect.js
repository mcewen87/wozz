import React, { Component } from "react"
import Select from "react-select"
import select from "./categorySelect.module.scss"

class CategorySelect extends Component {
  constructor() {
    super()
    this.state = {
      category: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.passOptionUp = this.passOptionUp.bind(this)
  }

  handleChange(option) {
    this.setState({
      category: option,
    })
  }

  passOptionUp() {
    this.props.sendOption(this.state.category)
  }

  render() {
    const colourOptions = [
      { value: "Lifestyle", label: "Lifestyle" },
      { value: "Productivity", label: "Productivity" },
      { value: "Work", label: "Work" },
      { value: "Finance", label: "Finance" },
      { value: "Mental", label: "Mental" },
      { value: "Diet", label: "Diet" },
      { value: "Health", label: "Health" },
      { value: "Exercise", label: "Exercise" },
      { value: "Food & Drink", label: "Food & Drink" },
      { value: "Social", label: "Social" },
      { value: "Family", label: "Family" },
      { value: "Friendship", label: "Friendship" },
      { value: "Love & Passion", label: "Love & Passion" },
      { value: "Habits", label: "Habits" },
      { value: "Milestones", label: "Milestones" },
      { value: "Setbacks & Blunders", label: "Setbacks & Blunders" },
      { value: "Wildcards", label: "Wildcards" },
    ]

    const customStyles = {
      option: (provided, { data, isFocused, isSelected }) => ({
        ...provided,
        backgroundColor: isFocused ? "#FFE066" : "#ffffff",
        color: "#50514F",
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#FFE066",
      }),
      indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: "#FFE066",
      }),
    }

    const defaultValue = "Select a category..."

    return (
      <div>
        <Select
          placeholder={defaultValue}
          label="Single select"
          options={colourOptions}
          styles={customStyles}
          onChange={this.handleChange}
        />

        <button onClick={this.passOptionUp} className={select.buttonCat}>
          Add Category
        </button>
      </div>
    )
  }
}

export default CategorySelect
