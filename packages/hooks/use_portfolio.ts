import {useState} from 'react';
import {Facility, GenerationDatum, Transfer} from 'schema/schema_gen_types';
import {
    generateFakeProductionData,
    useAnimatedProductionData,
} from 'utils/fake_data';
import useFacilities from './use_facilities';
import {subDays} from 'date-fns';

import {useTransfer} from 'hooks/use_transfer';
import {useUser} from './use_user';
import {Document} from '../documents/types';
import {useStorage} from './use_storage';

export interface usePortfolioReturnType {
    loading: boolean;
    facilityData: Facility | null;
    generationData: Array<GenerationDatum>;
    transfers: Array<Transfer>;
    documents: Array<Document>;
    lastUpdatedDate: Date | null;
}

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

    const facilityData = facilities ? facilities[0] : null;

    const {data: generationData, loading: generationDataLoading} =
        useGetFacilityDataByDate({
            facilityId: facilityData?.id,
            startDate: subDays(time, 7),
            endDate: time,
        });

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

    return {
        loading,
        facilityData,
        generationData: generationData,
        lastUpdatedDate,
        documents: documents,
        transfers: recentTransfers,
    };
};
