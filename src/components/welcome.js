import React from "react"
import "../main.scss"
import Mountains from "./mountains"
import welcome from "./welcome.module.scss"
import Tracker from "./tracker"
import saveData from "../reducers/helperFunctions/saveData"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"

const Welcome = props => (
  <div class={welcome.box}>
    <div className={welcome.content}>
      <div className={welcome.grid}>
        <div className={welcome.section}>
          <h1 className={welcome.wozz}>Wozz</h1>
          <div className={welcome.container}>
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
        </div>
        <div className={welcome.section}>
          <div className={welcome.card}>
            <p>
              {" "}
              Wozz helps you keep track of the things you do, so you can do them
              less or more. Or maybe never again.
            </p>
          </div>
        </div>
        <div className={welcome.section}>
          <div className={welcome.card}>
            <p> Wozz can keep track of when you:</p>

            <p>1. Go out for coffee.</p>

            <p>2. Skip the gym.</p>

            <p>3. Or call your Mom.</p>
          </div>
        </div>
        <div className={welcome.section}>
          <div className={welcome.card}>
            <p>
              Be the super hero version of yourself by living timely with Wozz.
              It's free, but you can donate here.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      onClick={() => {
        saveData("use", true)
        props.sendUse()
      }}
      className={welcome.button}
    >
      <p className={welcome.buttonFont}>Use Wozz </p>{" "}
      <FontAwesomeIcon className={welcome.icon} icon={faLongArrowAltRight} />{" "}
    </div>

    <Mountains />
  </div>
)

export default Welcome
