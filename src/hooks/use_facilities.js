import {useQuery, gql, useMutation} from '@apollo/client';

const useFacilities = () => {
    const GET_FACILITY_DATA_BY_DATE = gql`
        query UserFacilities(
            $id: String!
            $start_ms: String!
            $end_ms: String!
        ) {
            facilityGenerationByDate(
                id: $id
                start_ms: $start_ms
                end_ms: $end_ms
            ) {
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
                    start_ms: startDate.toISOString(),
                    end_ms: endDate.toISOString(),
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
