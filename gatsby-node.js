const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages
  const blogPostResult = await graphql(
    `
      {
        allContentfulBlog(
          filter: { node_locale: { eq: "en-US" } }
          sort: { fields: createdAt, order: DESC }
        ) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (blogPostResult.errors) {
    reporter.panicOnBuild(`Error While running GraphQL query.`)
    return
  }

  // Create Pages for each markdown file
  const blogPostTemplate = path.resolve(`src/templates/blog.js`)

  blogPostResult.data.allContentfulBlog.edges.forEach(({ node }) => {
    const path = `blog/${node.slug}`

    createPage({
      path,
      component: blogPostTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
      },
    })
  })
}
