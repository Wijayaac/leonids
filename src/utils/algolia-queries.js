const escapeStringRegexp = require("escape-string-regexp")

const pagePath = `content`
const indexName = `dev_Pages`

const pageQuery = `{
    pages: allMarkdownRemark(
        filter:{
            fileAbsolutePath: {regex: "/${escapeStringRegexp(pagePath)}/"},
        }
    ){
        edges {
            node {
                id
                frontmatter{
                    title
                }
                fields {
                    slug
                }
                excerpt(pruneLength: 50000)
            }
        }
    }
}`

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
    matchFields: ["slug", "modified"],
  },
]

module.exports = queries
