import {useQuery} from '@apollo/client';

const useGqlQuery = (query, options = {}) => {
    return useQuery(query, options);
};

export default useGqlQuery;
