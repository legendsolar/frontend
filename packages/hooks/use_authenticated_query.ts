import { gql, useQuery, useMutation } from "@apollo/client";
import { useAuth } from "@project/hooks/use_auth";

export const useAuthQuery = (
  ...params: Parameters<typeof useQuery>
): ReturnType<typeof useQuery> => {
  const { isAuthenticating } = useAuth();

  const resp = useQuery(params[0], {
    ...params[1],
    skip: params[1]?.skip || isAuthenticating,
  });

  resp.loading = resp.loading || isAuthenticating;

  return resp;
};
