import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from '@apollo/client';

import {createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import {getAuth} from 'firebase/auth';
import {throwAuthenticationError, throwSystemError} from '@p/utils/errors';
import {onError} from '@apollo/client/link/error';
import {signOut} from 'firebase/auth';
import {getUserSessionId} from 'session_id';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPH_QL_SERVER_URL,
});

const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists

    const user = getAuth().currentUser;

    if (!user) {
        throwAuthenticationError({
            message: 'Cannot make GraphQL request, user not authenticated',
        });
    }

    try {
        const token = await user?.getIdToken();

        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
                ['session-id']: getUserSessionId(),
            },
        };
    } catch (e) {
        signOut(getAuth());
        throw e;
    }
});

// TODO is this causing capcha errors?
const errorLink = onError(({networkError, graphQLErrors}) => {
    console.log('here');
    if (graphQLErrors)
        graphQLErrors.forEach(({message, locations, path}) => {
            if (message.includes('Context creation failed')) {
                signOut(getAuth());
            }

            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            );
        });
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
});
