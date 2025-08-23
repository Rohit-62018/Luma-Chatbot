import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import nhost from './nhostClient';

// HTTP Link for queries and mutations
const httpLink = new HttpLink({
  uri: nhost.graphql.getUrl(), 
  headers: () => ({
    Authorization: `Bearer ${nhost.auth.getAccessToken()}`,
  }),
});

// WebSocket Link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: nhost.graphql.getUrl().replace('https', 'wss'),
    connectionParams: () => ({
      headers: {
        Authorization: `Bearer ${nhost.auth.getAccessToken()}`,
      },
    }),
  })
);

// Split link: subscriptions -> wsLink, queries/mutations -> httpLink
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;