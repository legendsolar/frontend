import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@project/hooks/use_auth";
import { useReservations } from "./use_reservations";

export enum States {
  /** indeterminate state */
  LOADING,
  /** no panels reserved */
  NO_PANELS_RESERVED,
  /** panels reserved, but no account created*/
  PANELS_RESERVED,
  LOGGED_OUT,
  LOGGED_IN_NOT_INVESTOR,
  LOGGED_IN_INVESTOR,
}

export const userState = ({
  loadingOrIsAuthenticating,
  isAuthenticated,
  reservations,
}: {
  loadingOrIsAuthenticating: boolean;
  isAuthenticated: boolean;
  reservations: Array<any> | undefined;
}) => {
  const reservedPanels =
    typeof window !== "undefined"
      ? localStorage.getItem("panel-reserved-count")
      : false;

  if (loadingOrIsAuthenticating) {
    return States.LOADING;
  }

  if (!reservedPanels) {
    return States.NO_PANELS_RESERVED;
  }

  //   if (!isAuthenticated) {
  //     return States.LOGGED_OUT;
  //   }

  if (!reservations || reservations.length == 0) {
    return States.NO_PANELS_RESERVED;
  }

  return States.LOGGED_IN_NOT_INVESTOR;
};

export const UserStateMachine = ({ children }) => {
  const router = useRouter();
  const { isAuthenticating, user } = useAuth();
  const { loading, reservations } = useReservations();

  const state = userState({
    loadingOrIsAuthenticating: isAuthenticating || loading,
    isAuthenticated: isAuthenticating && !!user,
    reservations,
  });

  useEffect(() => {
    switch (state) {
      case States.NO_PANELS_RESERVED: {
        router.push("./reserve");
      }
    }
  }, [state]);

  switch (state) {
    case States.LOADING: {
      return <>loading</>;
    }
  }

  return children;
};
