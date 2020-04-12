/* tslint:disable */
/* eslint-disable */
/* @relayHash 9568d4dad9c2e8aa090c4271672bb121 */

import { ConcreteRequest } from "relay-runtime";
export type pages_indexQueryVariables = {};
export type pages_indexQueryResponse = {
    readonly ping: string;
};
export type pages_indexQuery = {
    readonly response: pages_indexQueryResponse;
    readonly variables: pages_indexQueryVariables;
};



/*
query pages_indexQuery {
  ping
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "ping",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "pages_indexQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "pages_indexQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "pages_indexQuery",
    "id": null,
    "text": "query pages_indexQuery {\n  ping\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd45d31131f8a654cf4386d7f89687a96';
export default node;
