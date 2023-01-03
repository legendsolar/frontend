import { gql, useQuery } from "@apollo/client";
import { FacilityCard } from "./facility_card";
import { Grid, Box } from "@mui/material";

export const ListFacilities = () => {
  const facilitiesQuery = gql`
    query AllFacilitiesQuery {
      facilities {
        id
      }
    }
  `;

  const { data, loading, error } = useQuery(facilitiesQuery);

  if (loading) {
    return <div>loading</div>;
  }

  console.log({ data });

  if (!data || error || data.facilities.length <= 0) {
    return <div>no facilities</div>;
  }

  console.log({ facilities: data.facilities });

  return (
    <div>
      {data.facilities.map(({ id }) => (
        <FacilityCard id={id} key={id} />
      ))}
    </div>
  );
};
