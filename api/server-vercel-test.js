import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";

import { authMiddleware } from "./utils/auth-vercel.js";

import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

/*
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => "world",
  },
};
*/

const startApolloServer = async(app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default app;
