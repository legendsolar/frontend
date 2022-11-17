import { ApolloLink } from "@apollo/client";
import * as jwt from "jsonwebtoken";

// Generate a signed token for the request
// since firebase auth emulator tokens are unsigned
const getLocallySignedToken = () => {
  return jwt.sign(
    {
      sub: "1234567890",
      name: "John Doe",
      admin: true,
      iat: 1516239022,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["editor", "user", "mod"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": "1234567890",
        "x-hasura-org-id": "123",
        "x-hasura-custom": "custom-value",
      },
    },
    "*74y56ESVGvgUd%RuCfCztMNhKCjF62q"
  );
};

// condition for signing the token
const isLocalEnvironment = () => {
  return location.hostname === "localhost";
};

//middleware to apply signed token on request
export const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  // const token = getAuthToken();
  // operation.setContext(() => ({
  //   headers: token
  //     ? {
  //         Authorization: `Bearer ${
  //           isLocalEnvironment() ? getLocallySignedToken(token) : token
  //         }`
  //       }
  //     : { "X-Hasura-Role": `anonymous` }
  // }));

  console.log("custom auth");

  operation.setContext(() => ({
    headers: {
      Authorization: `Bearer ${getLocallySignedToken()}`,
    },
  }));
  return forward(operation);
});
