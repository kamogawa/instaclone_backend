const {ApolloServer, gql} = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "hi baby,"
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(() => console.log("Server is running Localost:4000"))