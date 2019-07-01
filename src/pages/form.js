import React, { Component } from "react"
import Select from "react-select"

const categoryOptions = [
  { value: "Finance", label: "Finance" },
  { value: "Health", label: "Health" },
  { value: "Mental", label: "Mental" },
  { value: "Social", label: "Social" },
  { value: "Love-Life", label: "Love-Life" },
  { value: "Habits", label: "Habits" },
  { value: "Travel", label: "Travel" },
  { value: "Fitness", label: "Fitness" },
  { value: "Diet", label: "Diet" },
  { value: "Lifestyle", label: "Lifestyle" },
]

const categoryForm = () => (
  <div className="container">
    <div className="content">
      <Select defaultValue={categoryOptions[0]} options={categoryOptions} />
    </div>
  </div>
)

export default categoryForm
