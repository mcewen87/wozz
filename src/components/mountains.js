import React from "react"
import mountains from "./mountains.module.scss"

const Mountains = () => (
  <div className={mountains.landing}>
    <div className={mountains.mountainScene}>
      <div className={mountains.smallMountains}>
        <div className={mountains.tri}></div>
        <div className={mountains.tri}></div>
        <div class={mountains.tri}></div>
      </div>
      <div className={mountains.tallMountains}>
        <div className={mountains.tri2}></div>
        <div className={mountains.tri2}></div>
        <div className={mountains.tri2}></div>
      </div>

      <div className={mountains.tinyMountains}>
        <div className={mountains.tri3}></div>
        <div className={mountains.tri3}></div>
        <div className={mountains.tri3}></div>
        <div className={mountains.tri3}></div>
        <div className={mountains.tri3}></div>
      </div>
    </div>
  </div>
)

export default Mountains
