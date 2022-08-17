import {useState} from 'react';
import {Facility, GenerationDatum} from 'schema/schema_gen_types';
import {
    generateFakeProductionData,
    useAnimatedProductionData,
} from 'utils/fake_data';
import useFacilities from './use_facilities';
import {subDays} from 'date-fns';

export interface usePortfolioReturnType {
    loading: boolean;
    facilityData: Facility;
    generationData: Array<GenerationDatum>;
}

export const usePortfolio = (): usePortfolioReturnType => {
    const [time, setTime] = useState<Date>(new Date());

    const facilityData: Facility = {
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
        economics: {},
        generationMetaData: {
            co2_per_kWh: 0.85,
            dollar_per_kWh: 0.15,
            max_kW: 2,
        },
        location: {
            lat: 41.375094,
            lng: -74.692663,
        },
    };

    const {useGetFacilityDataByDate} = useFacilities();

    const {data: generationData, loading: generationDataLoading} =
        useGetFacilityDataByDate({
            facilityId: 'qqWHzumNkaVmZEvGfZRnq3',
            startDate: subDays(time, 7),
            endDate: time,
        });

    console.log(generationData);

    return {
        loading: generationDataLoading,
        facilityData,
        generationData: generationData,
    };
};
