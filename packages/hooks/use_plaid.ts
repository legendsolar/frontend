import { ApolloError } from "@apollo/client";
import { usePlaidLink } from "react-plaid-link";
import { BankAccount } from "schema/schema_gen_types";
import { transformPlaidDataToCreateAccountInput } from "transformers/plaid_api_transformers";
import { useAccount } from "./use_accounts";

interface usePlaidReturnType {
  usePlaidLinkModal(token: string | undefined): {
    open: Function;
    exit: Function;
    error: ErrorEvent | null;
    ready: boolean;
  };
  loading: boolean;
  error: ApolloError | undefined;
  newAccount: BankAccount | undefined;
}
export const usePlaid = (): usePlaidReturnType => {
  const { useCreateAccount } = useAccount();

  const {
    createAccount,
    loading: createAccountLoading,
    error: createAccoutError,
    account,
  } = useCreateAccount();

  const onPlaidLinkComplete = ({ publicToken, metadata }) => {
    const input = transformPlaidDataToCreateAccountInput(publicToken, metadata);

    // create account
    createAccount(input);
  };

  const usePlaidLinkModal = (token: string | undefined) => {
    const { open, ready, exit, error } = usePlaidLink({
      token: token ? token : "",
      onSuccess: (public_token, metadata) => {
        onPlaidLinkComplete({ publicToken: public_token, metadata });
      },
    });
    return {
      open,
      exit,
      ready,
      error,
    };
  };

  return {
    usePlaidLinkModal,
    loading: createAccountLoading,
    error: createAccoutError,
    newAccount: account,
  };
};
