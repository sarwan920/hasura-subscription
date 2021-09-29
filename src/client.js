import { ApolloClient, InMemoryCache } from '@apollo/client';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://comments-subscription.hasura.app/v1/graphql',
  headers:{
    'x-hasura-admin-secret':'sVEWsqul7NUTDRoewxmhl1LPAA9jEseYCws2S1uqfLRpF2SC1iytq08szgZgD066'
  }
});

const wsLink = new WebSocketLink({
  uri: 'wss://comments-subscription.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams:{
      headers:{
        'x-hasura-admin-secret':'sVEWsqul7NUTDRoewxmhl1LPAA9jEseYCws2S1uqfLRpF2SC1iytq08szgZgD066'
      }
    }
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
uri:'https://comments-subscription.hasura.app/v1/graphql',
  link: splitLink,
  cache: new InMemoryCache(),
  
});

export default client;