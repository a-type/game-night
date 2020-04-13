# game-night-api

## Development

Run `npm run dev` to launch the server in auto-reload mode, with an inspector port open, and a parallel process to generate types for resolvers from the schema.graphql file

Auto type generation occurs for resolvers, so if you specify any resolver map as `QueryResolvers` from the generated type file, it will typecheck your resolver functions against schema expectations.

### Writing Relay GraphQL

Relay is a specific pattern implemented in GraphQL. At first it seems like overkill, but the results are worth it - the opinions enforced in Relay make the client-side implementation extremely straightforward and consistent, avoiding many of the most annoying aspects of client-side GraphQL.

Here's the rundown on writing Relay:

#### Every distinct object is a Node

Every GraphQL type which acts as a self-sufficient object should inherit from the `Node` interface, which basically means it implements an `id: ID!` field.

Every `Node` can be refetched by itself using the root `node` query field and passing an ID. That means the `id` should encode the type of the object so you can look it up! Therefore, all IDs should start with a type name and a delimiter - I like to use `~` because it doesn't require URL encoding. But just to make life easier, you can base-64 encode the ID anyways.

The `node` root field has to disambiguate the various types that inherit from `Node` so it knows what fields are valid to return. This is also made simple by parsing the encoded ID for the type name.

Refetching with `node` is a huge deal. It means you can always grab the most up-to-date status of any object, even if that object was nested 5 levels deep in the original query.

#### Every collection is a Connection

This is the one that people get tired of. Every collection of items should be accessed using a Connection field which supplies edges. There are really good design reasons for requiring this, but it does get tedious.

Here's the full spec: https://relay.dev/graphql/connections.htm

Basically, any particular connection looks about like this:

```graphql
type User {
  friends(first: Int, after: String, last: Int, before: String): UserFriendsConnection!
}

type UserFriendsConnection {
  edges: [UserFriendsEdge!]!
  pageInfo: PageInfo!
}

type UserFriendsEdge {
  node: User!
  cursor: String!
}

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
  startCursor: String!
  endCursor: String!
}
```

`PageInfo` only has to be written once. So in the end, it's not _too_ much work. You do have to make sure you fetch data in a way that can populate all those page details though.

Because edges are used, we have much more clear understanding of relationships between nodes in our graph. Each edge has a cursor which we can use to refetch portions of the connection if we want to.

Cursors are opaque. They're often the creation date (useful when ordering by date) or something like that. Cursors aren't portable between queries. You might change the cursor value based on sorting parameters you add to the original connection.

#### There's always a root "viewer" field on Query

In addition to the `node` field mentioned above, often the only other field on the Query root type is `viewer`.

The `Viewer` type replaces `Query` as the main type for most query field definitions. The reason basically has to do with Connections. Relay can't query connections on the root type, so another layer has to be introduced so we have more control over the "parent" of the connection in the client.

To put it visually, if we didn't have viewer, a root connection would look like this in a client query:

```graphql
query {
  users(first: 100) {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

What object does `users` belong to? Where should we update that connection? These may not seem like meaningful questions, but they matter when it comes to how Relay works in a broad sense, so we define a Viewer:

```graphql
type Viewer {
  users(first: Int, after: String): UsersConnection!
}

type Query {
  viewer: Viewer!
}
```

This becomes more powerful and useful once you get past this basic implementation and start using `Viewer` the way it was designed: to represent the client "person" "viewing" the API. It's the client's window into the API, which may not return the same data for everyone viewing based on permissions! That's at least the origin of the name.

#### Inputs should be objects most of the time

This isn't a Relay thing, but it helps when writing good GraphQL. Most inputs for mutations should be `input` parameters with specific types. Things like "`AddUserFriendInput`" or "`CreateUserInput`".

#### Mutations return intermediate response objects

This isn't strictly specified in Relay, but it makes it easier at the cost of a bit more verbosity: return intermediate types when running mutations.

This helps make the API more extensible. For instance -

```graphql
type Mutation {
  addUserFriend(input: AddUserFriendInput!): AddUserFriendResult!
}

input AddUserFriendInput {
  userId: ID!
  friendId: ID!
}

type AddUserFriendResult {
  user: User!
  friend: Friend!
  userFriendsEdge: UserFriendsEdge!
}
```

Notice in the last `AddUserFriendResult` type we can return much more information. We have all that data on hand already if we just did the underlying database operation, so now clients can decide what they need from their response.

#### That's most of it

Besides that, Relay basically acts like normal GraphQL. The restrictions may seem like a lot at first. But if you've ever done client GraphQL at scale with an inconsistent schema, or tried to implement pagination without having considered all the nuances ahead of time, you may see the reasoning very quickly.
