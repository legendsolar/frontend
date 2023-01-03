import { gql, useQuery, useMutation } from "@apollo/client";
import { FacilityCard } from "./facility_card";
import { Stack, Box } from "@mui/material";

export const ListReservations = ({ userId }) => {
  const reservationsQuery = gql`
    query MyQuery($uid: String = "") {
      panel_reservations(where: { user_id: { _eq: $uid } }) {
        id
        panel_reserved_count
        qouted_total_investment
        user {
          name
        }
        facility {
          name
        }
      }
    }
  `;

  const {
    data: reservations,
    loading,
    error,
  } = useQuery(reservationsQuery, {
    variables: { uid: userId },
  });

  const deleteReservationMutation = gql`
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
        }
      }
    }
  `;

  const [deleteUserReservation] = useMutation(deleteReservationMutation);
  const [updateReservationMutation] = useMutation(updateReservationMutationGQL);

  if (loading) {
    return <div>loading</div>;
  }

  console.log({ reservations });

  if (!reservations || error || reservations.panel_reservations.length <= 0) {
    return <div>no reservations </div>;
  }

  console.log({ reservations: reservations.panel_reservations });

  return (
    <Stack>
      {reservations.panel_reservations.map(
        ({ id, user, facility, panel_reserved_count }, i) => (
          <Stack direction={"row"}>
            <p
              key={id}
            >{`${user.name} has ${panel_reserved_count} panel(s) reserved on ${facility.name}`}</p>

            <label>{`new panel count:`}</label>
            <input type={"number"} name="panel_count"></input>

            <button
              onClick={() => {
                updateReservationMutation({
                  variables: { id, panel_reserved_count: 10 },
                });
              }}
            >{`update`}</button>
            <button
              onClick={() => {
                deleteUserReservation({ variables: { id } });
              }}
            >{`remove`}</button>
          </Stack>
        )
      )}
    </Stack>
  );
};
