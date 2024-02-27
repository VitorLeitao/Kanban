const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    getTasks: [Task!]!
  }

  type Task {
    id: String!
    index: Int!
    title: String!
    date: String!
  }
`;

module.exports = typeDefs;
