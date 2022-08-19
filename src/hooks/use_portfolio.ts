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
import {Document} from 'components/documents/types';
import {useStorage} from './use_storage';

export interface usePortfolioReturnType {
    loading: boolean;
    facilityData: Facility;
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

    const fakeFacilityData: Facility = {
        name: 'Barnyard Solar',
        id: 'qqWHzumNkaVmZEvGfZRnq3',
        address: {
            city: 'Port Jervis',
            postalCode: '11111',
            state: 'NY',
            streetAddress: '285 Fulton St',
        },
        created: '2022-05-21T16:51:26',
        summary: {
            day_kWh: 1,
            monthToDate_kWh: 10,
            pastMonthGeneration_kWh: 10,
            pastWeek_kWh: 5,
            pastYearGeneration_kWh: 1000,
            performance_ratio: 1,
            totalGeneration_kWh: 10000,
            twentyFourHourGeneration_kWh: 1,
            uptime_percentage: 0.95,
            yearToDate_kWh: 1000,
        },
        economics: {
            cost_dollars: 72000,
            ppaDuration: '7 years',
            leaseRemaining: '7 years',
        },
        generationMetaData: {
            co2_per_kWh: 0.85,
            dollar_per_kWh: 0.15,
            max_kW: 2,
            panel_count: 177,
            make: 'Panasonic Evervolt',
        },
        location: {
            lat: 41.375094,
            lng: -74.692663,
        },
    };

    const facilityData = facilities
        ? {
              ...fakeFacilityData,
              ...facilities[0],
          }
        : fakeFacilityData;

    const {useGetFacilityDataByDate} = useFacilities();

    const {data: generationData, loading: generationDataLoading} =
        useGetFacilityDataByDate({
            facilityId: 'qqWHzumNkaVmZEvGfZRnq3',
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

    const {useRecentTransfers} = useTransfer();

    const {useUserDocuments} = useStorage();

    const {
        loading: recentTransfersLoading,
        error: recentError,
        transfers: recentTransfers,
    } = useRecentTransfers(5);

    const {loading: documentsLoading, documents} = useUserDocuments();

    return {
        loading:
            generationDataLoading ||
            userFacilityLoading ||
            recentTransfersLoading ||
            documentsLoading,
        facilityData,
        generationData: generationData,
        lastUpdatedDate,
        documents: documents,
        transfers: recentTransfers,
    };
};
