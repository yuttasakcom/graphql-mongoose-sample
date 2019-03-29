import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_HOST)
  .then(() => console.log(`MongoDB connected.`))
  .catch(err => console.log(err));

const app = express();

const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
  }

  type User {
    _id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, Graphq Mongoose Sample",
    users: () => [],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

export default app;
