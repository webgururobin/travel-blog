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

  // Query for creating archive page for all blog including pagination
  const postArchiveResult = await graphql(
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
  if (postArchiveResult.errors) {
    reporter.panicOnBuild(`Error While running GraphQL query.`)
    return
  }

  // Configure pagination
  const blogs = postArchiveResult.data.allContentfulBlog.edges
  const blogsPerPage = 9
  const numPages = Math.ceil(blogs.length / blogsPerPage)

  // Create an array for blog posts passed per page
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve(`src/templates/archive.js`),
      context: {
        limit: blogsPerPage,
        skip: i * blogsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Query for creating each category page
  const categoryResult = await graphql(
    `
      {
        allContentfulCategory(
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
  if (categoryResult.errors) {
    reporter.panicOnBuild(`Error While running GraphQL query.`)
    return
  }

  // Configure pagination
  const catBlogs = categoryResult.data.allContentfulCategory.edges
  const catBlogsPerPage = 9
  const catNumPages = Math.ceil(catBlogs.length / catBlogsPerPage)

  categoryResult.data.allContentfulCategory.edges.forEach(({ node }) => {
    createPage({
      path: `category/${node.slug}`,
      component: path.resolve(`src/templates/category.js`), // Create Pages for each markdown file
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        id: node.id,
      },
    })
  })

  // Create an array for blog posts passed per page
  // Array.from({ length: catNumPages }).forEach((_, i) => {
  //   createPage({
  //     path:
  //       i === 0
  //         ? `/category/${cat.node.slug}`
  //         : `/category/${cat.node.slug}/${i + 1}`,
  //     component: path.resolve(`src/templates/category.js`),
  //     context: {
  //       limit: catBlogsPerPage,
  //       skip: i * catBlogsPerPage,
  //       catNumPages,
  //       currentPage: i + 1,
  //     },
  //   })
  // })

  // categoryResult.data.allContentfulCategory.edges.forEach(({ node }) => {
  //   createPage({
  //     path: `category/${node.slug}`,
  //     component: path.resolve(`src/templates/category.js`), // Create Pages for each markdown file
  //     // In your blog post template's graphql query, you can use pagePath
  //     // as a GraphQL variable to query for data from the markdown file.
  //     context: {
  //       id: node.id,
  //     },
  //   })
  // })
}
