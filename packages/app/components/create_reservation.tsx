import { gql, useQuery, useMutation } from "@apollo/client";
import { Stack } from "@mui/material";

export const CreateReservation = ({ userId }: { userId: string }) => {
  const facilitiesQuery = gql`
    query AllFacilitiesQuery {
      facilities {
        id
        name
      }
    }
  `;

  const { data, loading, error } = useQuery(facilitiesQuery);

  const createReservationMutation = gql`
    mutation MyMutation(
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

  const [createNewReservation, { data: newReservationData }] = useMutation(
    createReservationMutation,
    {
      refetchQueries: ["PanelReservationQuery"],
    }
  );

  console.log({ newReservationData });

  if (loading) {
    return <div>loading</div>;
  }

  if (!data || error || data.facilities.length <= 0) {
    return <div>no facilities</div>;
  }

  const facilities = data.facilities;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const now = new Date().toISOString();
        const panelCount = (e.target as any)["panel_count"].value;
        createNewReservation({
          variables: {
            qouted_total_investment: 250 * panelCount,
            reservation_created: now,
            reservation_last_updated: now,
            user_id: userId,
            panel_reserved_count: panelCount,
            facility_id: (e.target as any)["facility_id"].value,
          },
        });
      }}
    >
      <label>facility:</label>
      <select name="facility_id">
        {facilities.map(({ id, name }) => (
          <option value={id}>{name}</option>
        ))}
      </select>

      <label>{`panel count:`}</label>
      <input type={"number"} name="panel_count"></input>

      <button type="submit">{`create new reservation`}</button>
    </form>
  );
};
