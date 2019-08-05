// src/pages/callback.js
import React from "react"
import Spinner from "../components/spinner"
import { handleAuthentication } from "../utilities/auth"

const Callback = () => {
  handleAuthentication()

  return <Spinner />
}

export default Callback
