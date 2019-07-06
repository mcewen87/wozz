import React from "react"
import subStyle from "./submit.module.scss"

const Submit = () => (
  <div className={subStyle.full}>
    <div className="content">
      <h3 className={subStyle.prompt}>How was your experience?</h3>
      <button className={subStyle.rank}>Positive</button>
      <button className={subStyle.rank}>Neutral</button>
      <button className={subStyle.rank}>Negative</button>
      <button className={subStyle.rank}>Not Applicable</button>
      <button className={subStyle.rankSub}>Submit</button>
    </div>
  </div>
)

export default Submit
