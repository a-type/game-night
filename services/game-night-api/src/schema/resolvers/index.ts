import { QueryResolvers } from '../generated/graphql';

const resolvers: QueryResolvers = {
  Query: {
    ping: () => 'pong',
  },
};

export default resolvers;
