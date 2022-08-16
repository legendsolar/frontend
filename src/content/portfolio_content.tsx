import {Typography, Stack} from '@mui/material';
import ContentDivider from 'components/basics/content_divider';
import TestMetricGauge from 'components/gauges/tests/test_metric_gauge';
import BasicMap from 'components/map/basic_map_component';
import TransferDataGrid from 'components/transfers/transfer_data_grid';
import Component from 'components/basics/component';
import RealTimeContent from 'content/real_time_content';
import {testTransfers} from 'static_data/placeholder_transfers';
import SideBarView from 'views/side_bar_view';

import PlaceholderWorm from 'components/worm/placeholder_worm';
import {
    EconomicsSummary,
    GenerationDatum,
    GenerationMetaData,
    GenerationSummary,
} from 'schema/schema_gen_types';
import TestProdWorm from 'components/worm/tests/test_prod_worm';
import InvestmentSupportComponent from 'components/invest/investment_support_component';
import IconAccordian from 'utils/icon_accordian';

interface PortfolioContentProps {
    title?: string;
    address?: string;
    subtitle?: string;
    allTimeReturn?: JSX.Element;
    realTimeData?: JSX.Element;
    sidebar?: JSX.Element;
    transactions?: JSX.Element;
    investmentSupport?: JSX.Element;
    about?: JSX.Element;
    details?: JSX.Element;
    documents?: JSX.Element;

    generationMetaData: GenerationMetaData;
    facilitySummary: GenerationSummary;
    facilityEconomics: EconomicsSummary;

    generation: Array<GenerationDatum>;
}

const PortfolioContent = ({
    title = '',
    address = '',
    subtitle = '',
    generationMetaData,
    facilitySummary,
    facilityEconomics,
    generation,
}: PortfolioContentProps) => {
    return (
        <div>
            <Stack sx={{mb: 3}}>
                <Typography variant={'headline2' as any}>{title}</Typography>

                <Stack direction="row" justifyContent={'space-between'}>
                    <Typography variant={'monoButton' as any}>
                        {address}
                    </Typography>
                    <Typography variant={'monoButton' as any}>
                        {subtitle}
                    </Typography>
                </Stack>
            </Stack>
            <Component
                standardWidth={false}
                sx={{
                    height: '400px',
                    width: '100%',
                    m: 0,
                    p: 0,
                    overflow: 'hidden',
                }}
            >
                <BasicMap
                    lat={40.73061}
                    lng={-73.935242}
                    width={'100%'}
                    height={'400px'}
                    zoom={10}
                ></BasicMap>
            </Component>

            <Stack sx={{mt: 4}}>
                <SideBarView
                    drawer={
                        <Component
                            standardWidth={false}
                            sx={{
                                backgroundColor: 'white.main',
                                width: '100%',
                            }}
                            shadow
                        >
                            <Typography>drawer</Typography>
                        </Component>
                    }
                    mainContent={
                        <Stack>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    All time return
                                </Typography>
                            </ContentDivider>

                            <Stack direction={'row'}>
                                <Component
                                    standardWidth={false}
                                    sx={{
                                        backgroundColor: 'whiteFog.main',
                                        width: '100%',
                                    }}
                                >
                                    <Stack spacing={1}>
                                        <Typography
                                            variant={'smallHeadline' as any}
                                        >
                                            💸
                                        </Typography>
                                        <Typography
                                            variant={'headline1' as any}
                                        >
                                            {'$' +
                                                facilitySummary.totalGeneration_kWh *
                                                    generationMetaData.dollar_per_kWh}
                                        </Typography>
                                        <Typography
                                            variant={'monoButton' as any}
                                        >
                                            {'USD Dividends Earned'}
                                        </Typography>
                                    </Stack>
                                </Component>
                                <Component
                                    standardWidth={false}
                                    sx={{
                                        backgroundColor: 'whiteFog.main',
                                        width: '100%',
                                    }}
                                >
                                    <Stack spacing={1}>
                                        <Typography
                                            variant={'smallHeadline' as any}
                                        >
                                            🌱
                                        </Typography>
                                        <Typography
                                            variant={'headline1' as any}
                                        >
                                            {'' +
                                                facilitySummary.totalGeneration_kWh *
                                                    generationMetaData.co2_per_kWh}
                                        </Typography>
                                        <Typography
                                            variant={'monoButton' as any}
                                        >
                                            {'LBS Carbon Averted'}
                                        </Typography>
                                    </Stack>
                                </Component>

                                <Component
                                    standardWidth={false}
                                    sx={{
                                        backgroundColor: 'whiteFog.main',
                                        width: '100%',
                                    }}
                                >
                                    <Stack spacing={1}>
                                        <Typography
                                            variant={'smallHeadline' as any}
                                        >
                                            ⚡
                                        </Typography>
                                        <Typography
                                            variant={'headline1' as any}
                                        >
                                            {'' +
                                                facilitySummary.totalGeneration_kWh}
                                        </Typography>
                                        <Typography
                                            variant={'monoButton' as any}
                                        >
                                            {'KWH Generated'}
                                        </Typography>
                                    </Stack>
                                </Component>
                            </Stack>

                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Real Time Data
                                </Typography>
                            </ContentDivider>

                            <RealTimeContent
                                generation={generation}
                                generationMetaData={generationMetaData}
                                summary={facilitySummary}
                            ></RealTimeContent>
                        </Stack>
                    }
                    drawerPosition={'right'}
                ></SideBarView>

                <ContentDivider>
                    <Typography variant={'monoButton' as any}>
                        Transactions
                    </Typography>
                </ContentDivider>
                <TransferDataGrid
                    transfers={testTransfers.slice(0, 5)}
                    loading={false}
                    sx={{
                        height: '500px',
                    }}
                ></TransferDataGrid>

                <SideBarView
                    drawer={
                        <div>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Investment Support
                                </Typography>
                            </ContentDivider>
                            <InvestmentSupportComponent
                                title={'Nera Lerner'}
                                description={
                                    'Nera is here to share the basics of online solar investing. You’ll have a specilist for the term of your investment. '
                                }
                            ></InvestmentSupportComponent>
                        </div>
                    }
                    mainContent={
                        <Stack>
                            <Component
                                standardWidth={false}
                                sx={{
                                    backgroundColor: 'whiteFog.main',
                                    width: '100%',
                                }}
                            ></Component>

                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    About this investment
                                </Typography>
                            </ContentDivider>

                            <IconAccordian
                                items={[
                                    {
                                        title: '7 year term',
                                        content: (
                                            <Typography
                                                variant={'description' as any}
                                            >
                                                Test
                                            </Typography>
                                        ),
                                        icon: (
                                            <Typography
                                                variant={'description' as any}
                                            >
                                                🗓️
                                            </Typography>
                                        ),
                                    },
                                    {
                                        title: 'Legends Rooftop monitoring',
                                        content: (
                                            <Typography
                                                variant={'description' as any}
                                            >
                                                Test
                                            </Typography>
                                        ),
                                        icon: (
                                            <Typography
                                                variant={'description' as any}
                                            >
                                                ⚡️
                                            </Typography>
                                        ),
                                    },
                                ]}
                            ></IconAccordian>

                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Details
                                </Typography>
                            </ContentDivider>

                            <Stack direction={'row'}>
                                <Component
                                    standardWidth={false}
                                    sx={{
                                        backgroundColor: 'whiteFog.main',
                                        width: '100%',
                                    }}
                                ></Component>
                                <Component
                                    sx={{
                                        backgroundColor: 'whiteFog.main',
                                        width: '100%',
                                    }}
                                    standardWidth={false}
                                ></Component>
                            </Stack>

                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Documents
                                </Typography>
                            </ContentDivider>
                        </Stack>
                    }
                ></SideBarView>
            </Stack>
        </div>
    );
};

export default PortfolioContent;
