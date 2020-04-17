import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout"
import Nav from "../components/nav"
import SEO from "../components/seo"

import "./blog.css"

const blogTemplate = ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.contentfulBlog.seoTitle}
        description={data.contentfulBlog.seoDescription}
        keywords={data.contentfulBlog.seoKeywords}
      />
      <Nav />
      <div className="blog__header">
        <div
          className="blog__hero"
          style={{
            backgroundImage: `url(${data.contentfulBlog.featuredImage.fluid.src})`,
          }}
        ></div>
        <div className="blog__info">
          <div className="blog__title">{data.contentfulBlog.title}</div>
        </div>
        <div className="blog__wrapper">
          <div
            class="blog__content"
            dangerouslySetInnerHTML={{
              __html: `${data.contentfulBlog.content.childMarkdownRemark.html}`,
            }}
          />
        </div>
      </div>
    </Layout>
  )
}
export const data = graphql`
  query BlogTemplate($id: String!) {
    contentfulBlog(id: { eq: $id }) {
      title
      slug
      content {
        childMarkdownRemark {
          html
        }
      }
      seoTitle
      seoDescription
      seoAuthor
      seoKeywords
      seoImage {
        fluid(maxWidth: 1200, quality: 100) {
          src
        }
      }
      featuredImage {
        fluid(maxWidth: 1200, quality: 100) {
          src
        }
      }
    }
  }
`

export default blogTemplate
