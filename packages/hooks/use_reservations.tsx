import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import { useAuth } from "@project/hooks/use_auth";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useAuthQuery } from "./use_authenticated_query";
import { clamp } from "@p/utils";
import { useRouter } from "next/router";
import { getAuth, User } from "firebase/auth";
import { useViralLoops } from "@project/hooks/viral_loops/use_viral_loops";
import {
  getViralLoopsStoredData,
  NewViralLoopsUserInput,
  ViralLoopsUser,
} from "@project/hooks/viral_loops/viral_loops";
import { parseUserDisplayName } from "@p/utils/google_utils";
import WebflowView from "@project/components/views/webflow_view";
import { States as NavStates } from "@project/components/nav/webflow_nav_bar";

const updateUserMutationGQL = gql`
  mutation CreateNewUserMutation(
    $uid: String = ""
    $last_name: String = ""
    $first_name: String = ""
  ) {
    update_users(
      where: { id: { _eq: $uid } }
      _set: { first_name: $first_name, last_name: $last_name }
    ) {
      returning {
        id
        last_name
        first_name
      }
    }
  }
`;

const reservationsQueryGQL = gql`
  query PanelReservationQuery($uid: String = "") {
    panel_reservations(where: { user_id: { _eq: $uid } }) {
      id
      panel_reserved_count
      qouted_total_investment
      user {
        name
        id
      }
      facility {
        name
        id
        panels_reserved
      }
    }
  }
`;

const createReservationMutationGQL = gql`
  mutation CreateReservationMutation(
    $facility_id: String = ""
    $panel_reserved_count: Int = 10
    $qouted_total_investment: numeric = ""
    $reservation_created: timestamp = ""
    $reservation_last_updated: timestamp = ""
    $user_id: String = ""
  ) {
    insert_panel_reservations_one(
      object: {
        qouted_total_investment: $qouted_total_investment
        reservation_created: $reservation_created
        reservation_last_updated: $reservation_last_updated
        user_id: $user_id
        panel_reserved_count: $panel_reserved_count
        facility_id: $facility_id
      }
    ) {
      id
      panel_reserved_count
      qouted_total_investment
      reservation_created
      reservation_last_updated
    }
  }
`;

const deleteReservationMutationGQL = gql`
  mutation deleteReservationMutation($id: String = "") {
    delete_panel_reservations(where: { id: { _eq: $id } }) {
      returning {
        id
        facility {
          id
          panels_reserved
        }
      }
    }
  }
`;

const updateReservationMutationGQL = gql`
  mutation updateReservationMutation(
    $id: String = ""
    $panel_reserved_count: Int = 10
  ) {
    update_panel_reservations(
      where: { id: { _eq: $id } }
      _set: { panel_reserved_count: $panel_reserved_count }
    ) {
      returning {
        id
        panel_reserved_count
        qouted_total_investment
        user {
          name
          id
        }
        facility {
          name
          id
          panels_reserved
        }
      }
    }
  }
`;

const facilityQueryGQL = gql`
  query FacilityQuery($id: String) {
    facilities(where: { id: { _eq: $id } }) {
      id
      name
      panel_cost
      panels_reserved
      panel_total
      address
    }
  }
`;

export enum States {
  /** indeterminate state */
  LOADING = "loading",
  NO_PANELS_RESERVED = "no_panels",
  PANELS_RESERVED = "panels",
  LOGGED_IN_NOT_INVESTOR = "logged_in",
}

export const navBarStateXForm = (state: States): NavStates => {
  switch (state) {
    case States.LOADING:
      return NavStates.LOGGED_OUT;
    case States.NO_PANELS_RESERVED:
      return NavStates.RESERVE_PANEL;
    case States.PANELS_RESERVED:
      return NavStates.LOGGED_OUT;
    case States.LOGGED_IN_NOT_INVESTOR:
      return NavStates.LOGGED_IN_NO_PANELS;
  }
};

export const userState = ({
  state,
  loadingOrIsAuthenticating,
  isAuthenticated,
  reservations,
}: {
  state: States;
  loadingOrIsAuthenticating: boolean;
  isAuthenticated: boolean;
  reservations: Array<any> | undefined;
}) => {
  const localReservedPanels = getLocalStorePanelsReserved();

  console.log({
    localReservedPanels,
    isAuthenticated,
    loadingOrIsAuthenticating,
  });

  if (loadingOrIsAuthenticating) {
    return state; // stay in current state
  }

  if (!localReservedPanels) {
    return States.NO_PANELS_RESERVED;
  }

  if (localReservedPanels && !isAuthenticated) {
    return States.PANELS_RESERVED;
  }

  return States.LOGGED_IN_NOT_INVESTOR;
};

const reservationContext = createContext<useReservationsReturnType>(
  {} as useReservationsReturnType
);

// hack
const urlQueryState = {};

export function ProvideReservations({ children }) {
  const reservation = useProvideReservations();

  const router = useRouter();

  const { state, redirect } = reservation;

  console.log({ state, path: router.pathname });

  useMemo(() => {
    switch (state) {
      case States.NO_PANELS_RESERVED: {
        if (router.pathname !== "/sign_in") {
          //  let the user nav straight to reserve
          redirect("./reserve");
        }
        break;
      }

      case States.PANELS_RESERVED: {
        if (router.pathname !== "/reserve") {
          //  let user go back to /reserve if they want
          redirect("./sign_up");
        }
        break;
      }

      case States.LOGGED_IN_NOT_INVESTOR: {
        redirect("./waitlist", urlQueryState);
        break;
      }
    }
  }, [state]);

  if (state === States.LOADING) {
    return (
      <WebflowView>
        <div></div>
      </WebflowView>
    );
  } else {
    return (
      <reservationContext.Provider value={reservation}>
        {children}
      </reservationContext.Provider>
    );
  }
}
export const useReservations = (): useReservationsReturnType => {
  return useContext(reservationContext);
};

interface useReservationsReturnType {
  state: States;
  loading: boolean;
  currentPanels: number;
  setCurrentPanels: (newPanels: number) => void;
  confirmPanels: () => void;
  logout: () => void;
  user: User | null;
  onSignInWithGoogle: () => Promise<void>;
  onSignUpWithEmail(input: {
    email: string;
    firstName: string;
    password: string;
    lastName: string;
  }): Promise<void>;
  currentReservedPanels: number | undefined;
  maxPanelReservations: number | undefined;
  costPerPanel: number | undefined;
  reservations: Array<any>;
  deleteUserReservation: (id: number) => void;
  redirect: (newPath: string, params?: any) => void;
}

const useProvideReservations = (): useReservationsReturnType => {
  const [state, setState] = useState(States.LOADING);
  const [currentPanels, setCurrentPanels] = useState(
    getLocalStorePanelsReserved() ? getLocalStorePanelsReserved() : 5
  );
  const [loading, setLoading] = useState(false);

  const { createNewViralLoopsUser } = useViralLoops();
  const { user, isAuthenticating, signup, signInOrUpWithGoogle, signout } =
    useAuth();

  const router = useRouter();

  const userId = user?.uid;

  const fakeFacilityId = "legends-res-panel-placeholder";

  const {
    data: panelReservationData,
    loading: panelReservationLoading,
    error,
  } = useAuthQuery(reservationsQueryGQL, {
    variables: { uid: userId },
  });

  const {
    data: facilityData,
    loading: facilityLoading,
    error: facilityError,
  } = useQuery(facilityQueryGQL, {
    variables: { id: fakeFacilityId },
  });

  const facility = facilityData?.facilities[0];

  console.log({ facility, facilityLoading, facilityError });

  const [deleteUserReservation] = useMutation(deleteReservationMutationGQL);
  const [createNewReservation] = useMutation(createReservationMutationGQL);
  const [updateUserData] = useMutation(updateUserMutationGQL);

  useMemo(() => {
    setState(
      userState({
        state,
        loadingOrIsAuthenticating: isAuthenticating || loading,
        isAuthenticated: !!user,
        reservations: [],
      })
    );
  }, [isAuthenticating, loading, user]);

  const transition = () => {
    setState(
      userState({
        state,
        loadingOrIsAuthenticating: isAuthenticating || loading,
        isAuthenticated: isAuthenticating && !!user,
        reservations: [],
      })
    );
  };

  console.log({ state });

  const onCreateNewUser = async (
    userId: string,
    user: NewViralLoopsUserInput
  ) => {
    const now = new Date().toISOString();

    if (currentPanels) {
      await createNewReservation({
        variables: {
          qouted_total_investment: facility?.panel_cost * currentPanels,
          reservation_created: now,
          reservation_last_updated: now,
          user_id: userId,
          panel_reserved_count: currentPanels,
          facility_id: fakeFacilityId,
        },
      });
    }

    const referallCode =
      window &&
      Object.fromEntries(new URL(window.location.href).searchParams)
        ?.referralCode;

    return await createNewViralLoopsUser(user, referallCode);
  };

  const updateUser = async ({
    userId,
    firstName,
    lastName,
  }: {
    userId: string;
    firstName: string;
    lastName: string;
  }) => {
    await updateUserData({
      variables: {
        uid: userId,
        last_name: lastName,
        first_name: firstName,
      },
    });
  };

  const redirect = (newPath: string, addedParams = {}) => {
    const windowParams = window
      ? Object.fromEntries(new URL(window.location.href).searchParams)
      : {};

    const query = window
      ? {
          ...windowParams,
          ...addedParams,
        }
      : addedParams;

    console.log({ query, windowParams, url: window.location.href });
    router.push({
      pathname: newPath,
      query,
    });
  };

  return {
    state,
    loading,
    currentPanels,
    setCurrentPanels: (newPanels: number) => {
      setCurrentPanels(clamp(1, 30, newPanels));
    },
    confirmPanels: async () => {
      localStorePanelsReserved(currentPanels ? currentPanels : 0);
      transition();
      redirect("./sign_up");
    },
    user,
    logout: async () => {
      localStorage.clear();
      setCurrentPanels(5);
      await signout();
    },
    onSignInWithGoogle: async () => {
      try {
        setLoading(true);
        const user = await signInOrUpWithGoogle();

        if (user && user.email) {
          const { firstName, lastName } = parseUserDisplayName(
            user.displayName as string | undefined
          );

          await onCreateNewUser(user.uid, {
            email: user.email,
            firstName,
            lastName,
          });
        }
        // needed for firing gtag events
        urlQueryState["reserveComplete"] = true;
      } finally {
        setLoading(false);
      }
    },
    onSignUpWithEmail: async ({ email, firstName, password, lastName }) => {
      try {
        setLoading(true);
        const user = await signup(email, password);

        if (user?.user.uid) {
          await updateUser({
            userId: user?.user.uid,
            firstName: firstName,
            lastName: lastName,
          });
          await onCreateNewUser(user.user.uid, { email, firstName, lastName });
        }

        // needed for firing gtag events
        urlQueryState["reserveComplete"] = true;
      } finally {
        setLoading(false);
      }
    },
    currentReservedPanels: facility?.panels_reserved,
    maxPanelReservations: facility?.panel_total,
    costPerPanel: facility?.panel_cost,
    deleteUserReservation: (id) => {
      deleteUserReservation({
        variables: { id },
        update: (cache, { data }) => {
          const removed = data.delete_panel_reservations.returning;

          const { panel_reservations } = cache.readQuery({
            query: reservationsQueryGQL,
            variables: { uid: userId },
          });

          console.log({ panel_reservations });
          console.log({ data });

          const new_panel_reservations = panel_reservations.filter(
            (reservation) => !removed.some((el) => reservation.id === el.id)
          );

          console.log({ new_panel_reservations });

          cache.writeQuery({
            query: reservationsQueryGQL,
            variables: { uid: userId },
            data: {
              panel_reservations: new_panel_reservations,
            },
          });
        },
      });
    },
    redirect,
  };
};

export const clearLocalStorePanelsReserved = () => {
  typeof window !== "undefined" &&
    localStorage.removeItem("panel-reserved-count");
};

export const localStorePanelsReserved = (panelsReserved: number) => {
  typeof window !== "undefined" &&
    localStorage.setItem("panel-reserved-count", panelsReserved.toString());
};

export const getLocalStorePanelsReserved = (): undefined | number => {
  const panels =
    typeof window !== "undefined"
      ? localStorage.getItem("panel-reserved-count")
      : undefined;

  if (panels) {
    return parseInt(panels);
  }

  return undefined;
};
