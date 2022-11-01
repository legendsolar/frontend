import {useState} from 'react';
import {Facility, GenerationDatum, Transfer} from 'schema/schema_gen_types';
import {
    generateFakeProductionData,
    useAnimatedProductionData,
} from 'utils/fake_data';
import useFacilities from './use_facilities';
import {useTransfer} from 'hooks/use_transfer';
import {useUser} from './use_user';
import {Document} from 'components/documents/types';
import {useStorage} from './use_storage';
import {differenceInSeconds, subDays} from 'date-fns';
export interface usePortfolioReturnType {
    loading: boolean;
    facilityData: Facility | undefined;
    generationData: Array<GenerationDatum> | undefined;
    transfers: Array<Transfer>;
    documents: Array<Document>;
    lastUpdatedDate: Date | null;
}

const sumOverGeneration = (
    array: Array<GenerationDatum>,
    start: Date,
    end: Date,
): number => {
    return array
        .filter((g) => {
            const d = new Date(g.time);

            return start < d && d < end;
        })
        .reduce((sum, g, i, array) => {
            const deltaT_s =
                i > 0
                    ? differenceInSeconds(
                          new Date(g.time),
                          new Date(array[i - 1].time),
                      )
                    : 0;

            return (g.wattage * deltaT_s) / (60 * 60) + sum;
        }, 0);
};

export const usePortfolio = (): usePortfolioReturnType => {
    const [time, setTime] = useState<Date>(new Date());
    const {useGetUserFacilities} = useUser();

    const {
        loading: userFacilityLoading,
        error,
        facilities,
    } = useGetUserFacilities();

    const {useGetFacilityDataByDate} = useFacilities();

    const {useRecentTransfers} = useTransfer();

    const {useUserDocuments} = useStorage();

    const {
        loading: recentTransfersLoading,
        error: recentError,
        transfers: recentTransfers,
    } = useRecentTransfers(5);

    const {loading: documentsLoading, documents} = useUserDocuments();

    const facilityData = facilities ? facilities[0] : undefined;

    const {data: rawGenerationData, loading: generationDataLoading} =
        useGetFacilityDataByDate({
            facilityId: facilityData?.id,
            startDate: subDays(time, 7),
            endDate: time,
        });

    const generationData = rawGenerationData
        ? [...rawGenerationData].sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
          )
        : undefined;

    const lastUpdatedDate = generationData
        ? generationData.reduce(
              (value, current) =>
                  new Date(current.time).getTime() > value.getTime()
                      ? new Date(current.time)
                      : value,
              new Date(0),
          )
        : null;

    const loading =
        generationDataLoading ||
        userFacilityLoading ||
        recentTransfersLoading ||
        (documentsLoading && !userFacilityLoading && !facilityData);

    const calculatedDayKWh = generationData
        ? sumOverGeneration(
              generationData,
              subDays(new Date(), 1),
              new Date(),
          ) / 1000
        : 0;

    return {
        loading,
        facilityData: facilityData
            ? {
                  ...facilityData,
                  generationTotals: {
                      ...facilityData.generationTotals,
                      twentyFourHourGeneration_kWh: {
                          ...facilityData.generationTotals
                              .twentyFourHourGeneration_kWh,
                          current: calculatedDayKWh,
                      },
                  },
              }
            : undefined,
        generationData: generationData,
        lastUpdatedDate,
        documents: documents,
        transfers: recentTransfers,
    };
};
