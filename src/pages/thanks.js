import React from "react"
import Layout from "../components/layout"
import Nav from "../components/nav"

import "./contact.css"

const thanksPage = () => {
  return (
    <Layout>
      <Nav />
      <div className="contact__header"></div>
      <div className="contact__thanks">
        <h1>Thank You! I'll get back to you soon,</h1>
      </div>
    </Layout>
  )
}

export default thanksPage
