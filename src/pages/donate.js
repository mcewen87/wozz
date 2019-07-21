import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { toggleDarkMode } from "../state/app"
import { connect } from "react-redux"

const SecondPage = () => (
  <Layout>
    <SEO title="Donate" />
    <div className="container">
      <div className="content">
        <div className="verticalCenter">
          <h1>Thank you so much..</h1>
          <p className="donation">
            Wozz is in beta at the moment. Donations help us add features more
            quickly.
          </p>
          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input
              type="hidden"
              name="hosted_button_id"
              value="Z2WD9KBTVA7J4"
            />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />
            <img
              alt=""
              border="0"
              src="https://www.paypal.com/en_US/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </div>
      </div>
    </div>
  </Layout>
)

export default SecondPage
