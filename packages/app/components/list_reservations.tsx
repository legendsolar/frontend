import { gql, useQuery, useMutation } from "@apollo/client";
import { FacilityCard } from "./facility_card";
import { Stack, Box } from "@mui/material";
import { useReservations } from "@project/hooks/use_reservations";

export const ListReservations = ({ userId }) => {
  const { reservations, deleteUserReservation, updateReservationMutation } =
    useReservations();

  console.log({ reservations });

  if (!reservations || reservations.length <= 0) {
    return <div>no reservations </div>;
  }

  console.log({ reservations: reservations });

  return (
    <Stack>
      {reservations.map(({ id, user, facility, panel_reserved_count }, i) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const panelCount = (e.target as any)["panel_count"].value;
            updateReservationMutation({
              variables: { id, panel_reserved_count: panelCount },
            });
          }}
        >
          <Stack direction={"row"} justifyContent="space-between">
            <p
              key={id}
            >{`${user.name} has ${panel_reserved_count} panel(s) reserved on ${facility.name}`}</p>

            <div>
              <p>{`new panel count:`}</p>
              <input type={"number"} name="panel_count"></input>
              <button type="submit">{`update`}</button>
            </div>
            <button
              onClick={() => {
                deleteUserReservation(id);
              }}
            >{`delete`}</button>
          </Stack>
        </form>
      ))}
    </Stack>
  );
};
