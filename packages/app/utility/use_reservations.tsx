import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "@project/hooks/use_auth";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useAuthQuery } from "./use_authenticated_query";
import { clamp } from "@p/utils";
import { useRouter } from "next/router";

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
  LOGGED_OUT = "logged_out",
  LOGGED_IN_NOT_INVESTOR = "logged_in",
  LOGGED_IN_INVESTOR = "logged_in_investor",
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
  const localReservedPanels = getLocalStorePanelsReserved();

  console.log({
    localReservedPanels,
    isAuthenticated,
    loadingOrIsAuthenticating,
  });

  if (loadingOrIsAuthenticating) {
    return States.LOADING;
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

export function ProvideReservations({ children }) {
  const reservation = useProvideReservations();

  const router = useRouter();

  const { state } = reservation;

  useEffect(() => {
    switch (state) {
      case States.NO_PANELS_RESERVED: {
        router.push("./reserve");
        return;
      }

      case States.PANELS_RESERVED: {
        router.push("./sign_up");
        return;
      }

      case States.LOGGED_IN_NOT_INVESTOR: {
        router.push("./waitlist");
        return;
      }
    }
  }, [state]);

  //   switch (state) {
  //     case States.LOADING: {
  //       return <>loading</>;
  //     }
  //   }

  return (
    <reservationContext.Provider value={reservation}>
      {children}
    </reservationContext.Provider>
  );
}
export const useReservations = (): useReservationsReturnType => {
  return useContext(reservationContext);
};

interface useReservationsReturnType {}

const useProvideReservations = (): useReservationsReturnType => {
  const [state, setState] = useState(States.LOADING);
  const [currentPanels, setCurrentPanels] = useState(5);

  const { user, isAuthenticating } = useAuth();

  const userId = user?.uid;

  const {
    data: panelReservationData,
    loading,
    error,
  } = useAuthQuery(reservationsQueryGQL, {
    variables: { uid: userId },
  });

  const {
    data: facilityData,
    loading: facilityLoading,
    error: facilityError,
  } = useQuery(facilityQueryGQL, {
    variables: { id: "legends-res-panel-placeholder" },
  });

  const facility = facilityData?.facilities[0];

  console.log({ facility, facilityLoading, facilityError });

  const [deleteUserReservation] = useMutation(deleteReservationMutationGQL);
  const [updateReservationMutation] = useMutation(updateReservationMutationGQL);

  useEffect(() => {
    setState(
      userState({
        loadingOrIsAuthenticating: isAuthenticating || loading,
        isAuthenticated: !!user,
        reservations: [],
      })
    );
  }, [isAuthenticating, loading, user]);

  const transition = () => {
    setState(
      userState({
        loadingOrIsAuthenticating: isAuthenticating || loading,
        isAuthenticated: isAuthenticating && !!user,
        reservations: [],
      })
    );
  };

  console.log({ state });

  return {
    state,
    loading,
    currentPanels,
    setCurrentPanels: (newPanels: number) => {
      setCurrentPanels(clamp(0, 30, newPanels));
    },
    confirmPanels: () => {
      localStorePanelsReserved(currentPanels);
      transition();
    },
    user,
    currentReservedPanels: facility?.panels_reserved,
    maxPanelReservations: facility?.panel_total,
    costPerPanel: facility?.panel_cost,
    reservations: panelReservationData?.panel_reservations
      ? panelReservationData.panel_reservations
      : [],
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
    updateReservationMutation,
  };
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
