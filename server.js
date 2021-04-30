require("dotenv").config({path: __dirname + '/.env'})

import { ApolloServer } from "apollo-server"; 
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  }, 
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(() => console.log(`Server is running Localost:${PORT}`));