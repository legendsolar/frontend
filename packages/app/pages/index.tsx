import React, { useState } from "react";

import { useTheme } from "@mui/material";
import { Test } from "@project/components/basics";
import { gql, useQuery } from "@apollo/client";

export default function Index() {
  const [state, setState] = useState("test");

  const query = gql`
    query {
      users {
        id
        name
      }
    }
  `;

  const { data } = useQuery(query);

  const theme = useTheme();

  console.log(data);

  return (
    <div>
      <div>simple hasura queries:</div>
      {data?.users && data.users.map((user, i) => <div>id: {user.id}</div>)}
      <div>
        <div>theme test:</div>
        {theme.palette.primary.main} <Test></Test>
      </div>
    </div>
  );
}
