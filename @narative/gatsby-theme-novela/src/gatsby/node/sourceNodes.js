module.exports = ({ actions }) => {
  actions.createTypes(`
    type Article implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140): String!
      tags: [String!]!
      body: String!
      hero: File @fileByRelativePath
      heroName: String
      heroUrl: String 
      timeToRead: Int
      canonical_url: String
    }
  `);
};
