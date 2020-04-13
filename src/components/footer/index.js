import React from "react"

import "./footer.css"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <div className="footer">
      <p>
        &copy; <Link to="/">Travel Blog</Link>
      </p>
    </div>
  )
}

export default Footer
