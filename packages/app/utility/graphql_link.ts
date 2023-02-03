import { HttpLink } from "@apollo/client";
import * as jwt from "jsonwebtoken";
import { setContext } from "@apollo/client/link/context";
import { getAuth } from "firebase/auth";
import { GraphQLError } from "graphql";

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
