import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import fetch from 'isomorphic-unfetch';

let relayEnvironment: Environment | null = null;

const relayServer = process.env.RELAY_SERVER;

if (!relayServer && process.env.NODE_ENV !== 'production') {
  console.error(
    `process.env.RELAY_SERVER is missing. Did you copy .env_example to .env?`,
  );
}

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(
  operation: any,
  variables: any,
  cacheConfig: any,
  uploadables: any,
) {
  // this code runs on server-side and client-side. both need to point to the same
  // server API host

  console.log(process.env);
  return fetch(`${relayServer}/graphql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then((response) => response.json());
}

export default function initEnvironment({ records = {} } = {}) {
  // Create a network layer from the fetch function
  const network = Network.create(fetchQuery);
  const store = new Store(new RecordSource(records));

  // Make sure to create a new Relay environment for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return new Environment({
      network,
      store,
    });
  }

  // reuse Relay environment on client-side
  if (!relayEnvironment) {
    relayEnvironment = new Environment({
      network,
      store,
    });
  }

  return relayEnvironment;
}
