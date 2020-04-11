import React from "react"
import { Link } from "gatsby"
import { window } from "browser-monads"

import logo from "../../images/console.logo.svg"
import "./nav.css"

const Nav = () => {
  return (
    <nav>
      <div className="nav__items">
        <a className="nav__item--left">
          <img src={logo} alt="Travel Blog" className="nav__item--logo" />
        </a>
        <Link
          to="/contact"
          className={
            window.location.href.indexOf("contact") > 0
              ? "nav__item--link active"
              : "nav__item--link"
          }
        >
          Contact
        </Link>
        <Link
          to="/blog"
          className={
            window.location.href.indexOf("blog") > 0 ||
            window.location.href.indexOf("category") > 0
              ? "nav__item--link active"
              : "nav__item--link"
          }
        >
          Blog
        </Link>
      </div>
    </nav>
  )
}

export default Nav
