import React from "react"
import "./featured.css"

import { graphql, navigate, StaticQuery } from "gatsby"

const Featured = () => (
  <StaticQuery
    query={graphql`
      query FeaturedQuery {
        allContentfulBlog(
          filter: { node_locale: { eq: "en-US" }, featured: { eq: true } }
          sort: { fields: [createdAt], order: DESC }
          limit: 1
        ) {
          edges {
            node {
              id
              slug
              title
              shortDescription
              featuredImage {
                fluid(maxWidth: 1200, quality: 85) {
                  src
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <header>
        {data.allContentfulBlog.edges.map(edge => (
          <div key={edge.node.id} className="header__section">
            <div
              className="header__hero"
              style={{
                backgroundImage: `url(${edge.node.featuredImage.fluid.src})`,
              }}
            ></div>
            <div className="header__content">
              <div className="header__info">
                <h1 className="header__title">{edge.node.title}</h1>
                <p className="header__subtitle">{edge.node.shortDescription}</p>
                <button
                  className="btn__med"
                  onClick={() => navigate(`/blog/${edge.node.slug}`)}
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </header>
    )}
  />
)

export default Featured
