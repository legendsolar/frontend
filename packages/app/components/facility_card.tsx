import { gql, useQuery } from "@apollo/client";
import { Stack } from "@mui/material";

export const FacilityCard = ({ id }: { id: string }) => {
  console.log({ render: id });

  const facilityQuery = gql`
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

  const { data, loading, error } = useQuery(facilityQuery, {
    variables: { id },
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (!data || error || data?.facilities?.length !== 1) {
    return <div>error loading facility: {id}</div>;
  }

  const facility = data.facilities[0];

  console.log({ facility });

  return (
    <Stack direction="row" justifyContent={"space-between"}>
      <p>{facility.id}</p>
      <p>{facility.name}</p>
      <p>${facility.panel_cost}</p>
      <p>{`${facility.panels_reserved}/${facility.panel_total} panels`}</p>
      <p>{`${facility.address.city}, ${facility.address.state}`}</p>
    </Stack>
  );
};
