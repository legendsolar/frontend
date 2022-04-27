import {gql, useQuery} from '@apollo/client';
import useGqlQuery from 'hooks/use_gql_query';
import GraphQlTest from '../graph_ql_test';

const TestGraphQlTest = () => {
    const {loading, error, data} = useGqlQuery(
        gql`
            query Query($userId: ID!) {
                user(id: $userId) {
                    id
                    email
                }
            }
        `,
        {
            variables: {
                userId: 'testUserId',
            },
        },
    );

    return <GraphQlTest data={data}></GraphQlTest>;
};

export default TestGraphQlTest;
