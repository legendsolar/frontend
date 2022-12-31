import { gql, useQuery } from "@apollo/client";

export const UserCard = ({ uid }: { uid: string }) => {
  console.log({ uid });

  const userQuery = gql`
    query CurrentUserQuery($id: String) {
      users(where: { id: { _eq: $id } }) {
        id
        name
        created_account
      }
    }
  `;
  const { data, loading, error } = useQuery(userQuery, {
    variables: { id: uid },
  });

  if (loading) {
    return <div>loading</div>;
  }

  console.log({ data });

  if (!data || error || data.users.length <= 0) {
    return <div>error: {error?.message}</div>;
  }

  const userName = data.users[0].name;
  const id = data.users[0].id;

  return (
    <div>
      <p>{"hasura id: " + id}</p>
      <p>{"name: " + userName}</p>
    </div>
  );
};
