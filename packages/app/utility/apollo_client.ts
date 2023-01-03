import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { hasuraLink } from "./graphql_link";

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
  link: hasuraLink,
});
