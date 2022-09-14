import {Typography, Stack, Box} from '@mui/material';
import ContentDivider from 'components/basics/content_divider';
import BasicMap from 'components/map/basic_map_component';
import TransferDataGrid from 'components/transfers/transfer_data_grid';
import Component from 'components/basics/component';
import RealTimeContent from 'content/real_time_content';
import SideBarView from 'views/side_bar_view';
import {Facility, GenerationDatum, Transfer} from 'schema/schema_gen_types';
import InvestmentSupportComponent from 'components/invest/investment_support_component';
import IconAccordian from 'utils/icon_accordian';
import SideBar from 'components/utils/sidebar_component';
import MetricList from 'components/summary/metric_list';
import SmallPanelDisplaySVG from 'assets/images/small_panel_display.svg';
import Image from 'utils/image';

import PanelParkingLotPNG from 'assets/images/panel_parking_lot.png';
import PanelWarehousePNG from 'assets/images/panel_warehouse.png';
import DocumentListComponent from 'components/documents/document_list_component';
import {numberFormatter, currencyFormatter} from 'utils/number_formatter';
import LoadingContent from 'content/loading_content';
import {Document} from 'components/documents/types';
import EmptyContent from './empty_content';
import {CashIcon, LeafIcon, PowerIcon} from 'components/icons/emoji_icons';
import MetricBox from 'components/gauges/metric_box';
import {siteCopy} from 'static/copy';
interface PortfolioContentProps {
    loading?: boolean;
    title?: string;
    address?: string;
    subtitle?: string;
    facility: Facility | null;
    transfers: Array<Transfer>;
    documents: Array<Document>;
    dataStale: boolean;
    generation: Array<GenerationDatum>;
}

const PortfolioContent = ({
    loading = false,
    title = '',
    address = '',
    subtitle = '',
    facility,
    transfers,
    documents,
    generation,
    dataStale,
}: PortfolioContentProps) => {
    if (loading) return <LoadingContent />;

    if (!facility) return <EmptyContent />;

    const nonNullFacility = facility as unknown as Facility;

    const {generationMetaData, location, economics, summary} = nonNullFacility;

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
                    lat={location?.lat || 41.375094}
                    lng={location?.lng || -74.692663}
                    width={'100%'}
                    height={'400px'}
                    zoom={8}
                ></BasicMap>
            </Component>

            <Stack sx={{mt: 4}}>
                <SideBarView
                    drawer={
                        <SideBar
                            sx={{
                                backgroundColor: 'white.main',
                            }}
                        >
                            <Stack>
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography
                                        variant={'smallHeadline' as any}
                                    >
                                        {generationMetaData.panel_count +
                                            ' panels'}
                                    </Typography>
                                    <Stack alignItems={'flex-end'}>
                                        <Typography
                                            variant={'smallHeadline' as any}
                                            color={'legendaryGreen.main' as any}
                                        >
                                            {currencyFormatter(
                                                summary.twentyFourHourGeneration_kWh *
                                                    generationMetaData.dollar_per_kWh,
                                            )}
                                        </Typography>
                                        <Typography
                                            variant={'monoButton' as any}
                                        >
                                            Today's earnings
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Box
                                    style={{
                                        marginRight: '-20px',
                                        marginLeft: '-20px',
                                    }}
                                    sx={{
                                        backgroundColor: 'whiteHaze.main',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img src={SmallPanelDisplaySVG}></img>
                                </Box>
                                <MetricList
                                    dividers
                                    valuePairs={[
                                        {
                                            metric: 'Watts',
                                            value: numberFormatter(
                                                generationMetaData.max_kW *
                                                    1000,
                                                5,
                                            ),
                                        },
                                        {
                                            metric: 'Cost',
                                            value: currencyFormatter(
                                                economics.cost_dollars,
                                            ),
                                        },
                                        {
                                            metric: 'Portfolio balance',
                                            value: '100%',
                                        },
                                    ]}
                                ></MetricList>
                            </Stack>
                        </SideBar>
                    }
                    mainContent={
                        <Stack>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    All time return
                                </Typography>
                            </ContentDivider>

                            <Stack direction={'row'}>
                                <MetricBox
                                    metric={
                                        '$' +
                                        numberFormatter(
                                            summary.totalGeneration_kWh *
                                                generationMetaData.dollar_per_kWh,
                                            2,
                                        )
                                    }
                                    icon={<CashIcon></CashIcon>}
                                    title={'USD Dividends Earned'}
                                ></MetricBox>

                                <MetricBox
                                    metric={numberFormatter(
                                        summary.totalGeneration_kWh *
                                            generationMetaData.co2_per_kWh,
                                        3,
                                    )}
                                    icon={<LeafIcon />}
                                    title={'LBS Carbon Averted'}
                                ></MetricBox>

                                <MetricBox
                                    metric={numberFormatter(
                                        summary.totalGeneration_kWh,
                                        3,
                                    )}
                                    icon={<PowerIcon />}
                                    title={'kWh Generated'}
                                ></MetricBox>
                            </Stack>

                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Real Time Data
                                </Typography>
                            </ContentDivider>

                            <RealTimeContent
                                facility={nonNullFacility}
                                generation={generation}
                                dataStale={dataStale}
                                message={subtitle}
                            ></RealTimeContent>
                        </Stack>
                    }
                    drawerPosition={'right'}
                ></SideBarView>

                <ContentDivider>
                    <Typography variant={'monoButton' as any}>
                        Recent Transactions
                    </Typography>
                </ContentDivider>
                <TransferDataGrid
                    transfers={transfers}
                    loading={false}
                    sx={{
                        height: '400px',
                    }}
                ></TransferDataGrid>

                <SideBarView
                    drawer={
                        <Box sx={{mt: 4}}>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Investment Support
                                </Typography>
                            </ContentDivider>
                            <InvestmentSupportComponent
                                title={'Nera Lerner'}
                                subtitle={'Solar Investing Specialist'}
                                description={
                                    'Nera is here to share the basics of online solar investing. You’ll have a specilist for the term of your investment. '
                                }
                                sx={{mt: 4}}
                            ></InvestmentSupportComponent>
                        </Box>
                    }
                    mainContent={
                        <Stack>
                            <Component
                                standardWidth={false}
                                sx={{
                                    backgroundColor: 'whiteFog.main',
                                    width: '100%',
                                }}
                            >
                                <Stack direction={'row'}>
                                    <Image src={PanelParkingLotPNG}></Image>
                                    <Image src={PanelWarehousePNG}></Image>
                                </Stack>
                            </Component>

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
                                                {siteCopy.aboutSevenYearTerm}
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
                                                {
                                                    siteCopy.aboutRooftopMonitoring
                                                }
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
                                    {
                                        title: 'Investment Tax Credit',
                                        content: (
                                            <Typography
                                                variant={'description' as any}
                                            >
                                                {
                                                    siteCopy.aboutInvestmentTaxCredit
                                                }
                                            </Typography>
                                        ),
                                        icon: (
                                            <Typography
                                                variant={'description' as any}
                                            >
                                                💸
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
                                >
                                    <Typography
                                        variant={'smallHeadline' as any}
                                    >
                                        Economics
                                    </Typography>
                                    <MetricList
                                        dividers
                                        valuePairs={[
                                            {
                                                metric: 'Investor Funds',
                                                value: currencyFormatter(
                                                    nonNullFacility.economics
                                                        .cost_dollars,
                                                ),
                                            },
                                            {
                                                metric: 'Hold Term',
                                                value:
                                                    nonNullFacility.economics
                                                        .ppaDuration || 'NA',
                                            },
                                            {
                                                metric: 'Estimated ROI',
                                                value: '10.0%',
                                            },
                                        ]}
                                    ></MetricList>
                                </Component>
                                <Component
                                    sx={{
                                        backgroundColor: 'whiteFog.main',
                                        width: '100%',
                                    }}
                                    standardWidth={false}
                                >
                                    <Typography
                                        variant={'smallHeadline' as any}
                                    >
                                        Specifications
                                    </Typography>
                                    <MetricList
                                        dividers
                                        valuePairs={[
                                            {
                                                metric: 'Number of Panels',
                                                value: generationMetaData.panel_count.toFixed(
                                                    0,
                                                ),
                                            },
                                            {
                                                metric: 'Make & model',
                                                value:
                                                    nonNullFacility
                                                        .generationMetaData
                                                        .make || 'NA',
                                            },
                                            {
                                                metric: 'Watts Installed',
                                                value:
                                                    numberFormatter(
                                                        nonNullFacility
                                                            .generationMetaData
                                                            .max_kW * 1000,
                                                    ) || 'NA',
                                            },
                                        ]}
                                    ></MetricList>
                                </Component>
                            </Stack>

                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Documents
                                </Typography>
                            </ContentDivider>

                            <DocumentListComponent
                                documents={documents}
                            ></DocumentListComponent>
                        </Stack>
                    }
                ></SideBarView>
            </Stack>
        </div>
    );
};

export default PortfolioContent;
