import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import db from "./models";

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

  type Mutation {
    createUser(data: CreateUserInput!): User!
  }

  type User {
    _id: ID!
    name: String!
  }

  input CreateUserInput {
    name: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, Graphq Mongoose Sample",
    users: (parent, arg, { db }) => db.users.find(),
  },
  Mutation: {
    createUser: (parent, { data }, { db }) => {
      const { name } = data;
      const user = new db.users({
        name,
      }).save();
      return user;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, context: { db } });

server.applyMiddleware({ app });

export default app;
