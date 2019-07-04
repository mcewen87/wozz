import React from "react"
import "../main.scss"

import welcome from "./welcome.module.scss"
import Tracker from "./tracker"
import saveData from "../reducers/helperFunctions/saveData"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faChartPie } from "@fortawesome/free-solid-svg-icons"
import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const Welcome = props => (
  <div class={welcome.box}>
    <div className={welcome.panel}>
      <div className={welcome.sunBox}>
        <div className={welcome.front}>
          <span className={welcome.leftfront}></span>
          <span className={welcome.rightfront}></span>
        </div>
        <span className={welcome.sunSunshine}></span>
        <span className={welcome.sun}></span>
        <div className={welcome.back}>
          <span className={welcome.leftback}></span>
          <span className={welcome.rightback}></span>
        </div>
      </div>
      <h1>Wozz</h1>
      <div className={welcome.row}>
        <p className={welcome.message}>Time + Life Management for All</p>
        <FontAwesomeIcon className={welcome.heart} icon={faHeart} />{" "}
      </div>
      <div className={welcome.row}>
        <div
          onClick={() => {
            saveData("use", true)
            props.sendUse()
          }}
          className={welcome.button}
        >
          <p className={welcome.buttonFont}>Use Wozz </p>{" "}
        </div>{" "}
        <div className={welcome.button}>
          <p className={welcome.buttonFont}> Support </p>{" "}
        </div>
      </div>
    </div>
  </div>
)

export default Welcome
