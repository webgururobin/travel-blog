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

  blogPostResult.data.allContentfulBlog.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.slug}`,
      component: path.resolve(`src/templates/blog.js`), // Create Pages for each markdown file
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        id: node.id,
      },
    })
  })
}
