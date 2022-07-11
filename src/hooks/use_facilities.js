import {useQuery, gql, useMutation} from '@apollo/client';

const useFacilities = () => {
    const GET_FACILITY_DATA_BY_DATE = gql`
        query UserFacilities($id: String!, $start: String!, $end: String!) {
            facilityGenerationByDate(id: $id, start: $start, end: $end) {
                time
                wattage
            }
        }
    `;

    const useGetFacilityDataByDate = ({facilityId, startDate, endDate}) => {
        const {loading, error, data, refetch} = useQuery(
            GET_FACILITY_DATA_BY_DATE,
            {
                variables: {
                    id: facilityId,
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                },
            },
        );

        if (data) {
            console.log({data});
        }

        return {
            data: data?.facilityGenerationByDate,
            loading,
            error,
            refetch,
        };
    };

    return {
        useGetFacilityDataByDate,
    };
};

export default useFacilities;
