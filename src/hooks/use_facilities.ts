import {useQuery, gql, useMutation, ApolloError} from '@apollo/client';
import {GenerationDatum} from 'schema/schema_gen_types';

export interface useFacilitiesReturnType {
    useGetFacilityDataByDate({
        facilityId,
        startDate,
        endDate,
    }: {
        facilityId: string | undefined;
        startDate: Date;
        endDate: Date;
    }): {
        data: Array<GenerationDatum> | undefined;
        loading: boolean;
        error: ApolloError | undefined;
        refetch(): void;
    };
}

const useFacilities = (): useFacilitiesReturnType => {
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
                skip: !facilityId,
                variables: {
                    id: facilityId,
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                },
            },
        );

        return {
            data: data
                ? (data?.facilityGenerationByDate as Array<GenerationDatum>)
                : undefined,
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
