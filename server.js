import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server"; 

const client = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    year: Int
    genre: String
    CreatedAt: String
    UpdatedAt: String
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!, year:Int!, genre:String): Movie
    deleteMovie(title: String!): Boolean
  }
`;


const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: () => ({ "title": "xman", year: 2020 })
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) => client.movie.create({data: {
      title,
      year,
      genre
    }}),
    deleteMovie: (_, {title}) => {
      console.log(title);
      return true;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(() => console.log("Server is running Localost:4000"))