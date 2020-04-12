import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { logger } from './logger';
import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app });

export const start = async (port = process.env.PORT || 8080) => {
  await new Promise((resolve) => {
    app.listen({ port }, () => {
      logger.info(
        `API ready at http://localhost:${port}${apolloServer.graphqlPath}`,
      );
    });
    resolve();
  });

  return app;
};

start();
