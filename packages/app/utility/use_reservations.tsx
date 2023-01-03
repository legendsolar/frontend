import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "@project/hooks/use_auth";
import { gql, useQuery, useMutation } from "@apollo/client";

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
      }
    }
  }
`;

const deleteReservationMutationGQL = gql`
  mutation deleteReservationMutation($id: String = "") {
    delete_panel_reservations(where: { id: { _eq: $id } }) {
      returning {
        id
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
        }
      }
    }
  }
`;

const reservationContext = createContext<useReservationsReturnType>(
  {} as useReservationsReturnType
);

export function ProvideReservations({ children }) {
  const reservation = useProvideReservations();
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
  const { user } = useAuth();

  const userId = user?.uid;

  const {
    data: panelReservationData,
    loading,
    error,
  } = useQuery(reservationsQueryGQL, {
    variables: { uid: userId },
  });

  const [deleteUserReservation] = useMutation(deleteReservationMutationGQL);
  const [updateReservationMutation] = useMutation(updateReservationMutationGQL);

  console.log({ panelReservationData });

  return {
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
