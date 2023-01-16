import { HttpLink } from "@apollo/client";
import * as jwt from "jsonwebtoken";
import { setContext } from "@apollo/client/link/context";
import { getAuth } from "firebase/auth";
import { GraphQLError } from "graphql";

// const authLink = setContext(async (_, { headers }) => {
//   // get the authentication token from local storage if it exists

//   const user = getAuth().currentUser;

//   if (!user) {
//     throwAuthenticationError({
//       message: "Cannot make GraphQL request, user not authenticated",
//     });
//   }

//   try {
//     const token = await user?.getIdToken();

//     // return the headers to the context so httpLink can read them
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : "",
//         ["session-id"]: "test",
//       },
//     };
//   } catch (e) {
//     signOut(getAuth());
//     throw e;
//   }
// });

// // TODO is this causing capcha errors?
// const errorLink = onError(({ networkError, graphQLErrors }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       if (message.includes("Context creation failed")) {
//         signOut(getAuth());
//       }

//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );
//     });
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPH_QL_URL,
});

// Generate a signed token for the request
// since firebase auth emulator tokens are unsigned
const locallySignedToken = (token: string) => {
  const decodedToken = jwt.decode(token) as any;

  console.log({ decodedToken });

  return jwt.sign(
    {
      ...decodedToken,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": getAuth().currentUser?.uid,
        "x-hasura-org-id": "123",
        "x-hasura-custom": "custom-value",
      },
    },
    "*74y56ESVGvgUd%RuCfCztMNhKCjF62q" // just has to match hasura's signing key
  );
};

// condition for signing the token
const isLocalEnvironment = () => {
  return process?.env?.NEXT_PUBLIC_FIREBASE_EMULATOR === "TRUE";
};

const hasuraAuthMiddleware = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists

  if (!headers) {
    headers = {};
  }

  const user = getAuth().currentUser;

  console.log({ contextUser: user });

  const token = await user?.getIdToken();

  const localEnv = isLocalEnvironment();

  console.warn({ localEnv });

  if (token) {
    headers["Authorization"] = `Bearer ${
      localEnv ? locallySignedToken(token) : token
    }`;
  }

  return {
    headers: {
      ...headers,
    },
  };
});

export const hasuraLink = hasuraAuthMiddleware.concat(httpLink);
