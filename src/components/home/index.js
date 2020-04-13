import React from "react"
import "./home.css"

import { graphql, navigate, StaticQuery } from "gatsby"

const Featured = () => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        allContentfulBlog(
          filter: {
            node_locale: { eq: "en-US" }
            home: { eq: true }
            featuredImage: { fluid: { src: {} } }
          }
          sort: { fields: createdAt, order: DESC }
          limit: 9
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
              category {
                id
                title
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className="feed">
        {data.allContentfulBlog.edges.map(edge => (
          <div
            onClick={() => navigate(`/blog/${edge.node.slug}`)}
            key={edge.node.id}
            className="card"
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                rgba(10, 10, 10, 0) 0%,
                rgba(10, 10, 10, 0) 50%,
                rgba(10, 10, 10, 0.7) 100%
              ),
              url(${edge.node.featuredImage.fluid.src})
              `,
            }}
          >
            {edge.node.category.map(cat => (
              <p className="card__category">{cat.title}</p>
            ))}
            <p className="card__title">{edge.node.title}</p>
          </div>
        ))}
      </div>
    )}
  />
)

export default Featured
