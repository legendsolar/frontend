import {Typography, Stack, Box, Grid, Slider} from '@mui/material';
import {ContentDivider} from '@project/components/basics/content_divider';
import {TransferDataGrid} from '@project/components/transfers/transfer_data_grid';
import {Component} from '@project/components/basics/component';
import RealTimeContent from './real_time_content';
import SideBarView from '@project/components/views/side_bar_view';
import {Facility, GenerationDatum, Transfer} from '@p/schema';
import {InvestmentSupportComponent} from '@project/components/invest/investment_support_component';
import IconAccordian from '@project/components/utils/icon_accordian';
import {SideBar} from '@project/components/nav/sidebar_component';
import {MetricList} from '@project/components/metrics/metric_list';
import SmallPanelDisplaySVG from '@project/components/assets/images/small_panel_display.svg';
import {DocumentListComponent} from '@project/components/documents/document_list_component';
import {numberFormatter, currencyFormatter} from '@p/utils/number_formatter';
import LoadingContent from './loading_content';
import {Document} from '@project/components/documents/types';
import EmptyContent from './empty_content';
import {
    CalendarIcon,
    CashIcon,
    LeafIcon,
    PowerIcon,
} from '@project/components/icons/emoji_icons';
import {MetricBox} from '@project/components/gauges/metric_box';
import {siteCopy} from '../static/copy';
import {MetricComponent} from '@project/components/metrics/metric_component';
import {MapTerrain3D} from '@project/components/map/map_terrain_3d';
import {TooltipMarker} from '@project/components/map/tooltip_marker';
import {transferTransformer} from '@project/hooks/transformers/transfer_transforms';
interface PortfolioContentProps {
    loading?: boolean;
    title?: string;
    address?: string;
    subtitle?: string;
    facility: Facility | undefined;
    transfers: Array<Transfer>;
    documents: Array<Document>;
    dataStale: boolean;
    generation: Array<GenerationDatum> | undefined;
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

    const {
        generationMetaData,
        location,
        economics,
        generationTotals,
        earningsTotals,
    } = nonNullFacility;

    return (
        <div>
            <Stack sx={{mb: 3}}>
                <Typography variant={'headline2' as any}>{title}</Typography>

                <Stack direction="row" justifyContent={'space-between'}>
                    <Typography
                        variant={'monoButton' as any}
                        sx={{color: 'blackDawn.main'}}
                    >
                        {address}
                    </Typography>
                    <Typography
                        variant={'monoButton' as any}
                        sx={{color: 'blackDawn.main'}}
                    >
                        {subtitle}
                    </Typography>
                </Stack>
            </Stack>
            <Component
                standardWidth={false}
                sx={{
                    height: '320px',
                    width: '100%',
                    m: 0,
                    p: 0,
                    overflow: 'hidden',
                }}
            >
                <MapTerrain3D
                    lat={facility.location?.lat || 41.375094}
                    lng={facility.location?.lng || -74.692663}
                    width={'100%'}
                    height={'320px'}
                    zoom={13}
                    initBearing={0}
                    markers={[
                        <TooltipMarker
                            location={facility.location}
                            title={facility.name}
                        ></TooltipMarker>,
                    ]}
                ></MapTerrain3D>
            </Component>

            <Stack sx={{mt: 4}}>
                <SideBarView
                    drawerPosition={'right'}
                    constrainedDrawerPostion={'none'}
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
                                                generationTotals
                                                    .twentyFourHourGeneration_kWh
                                                    .current *
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
                            <Grid container>
                                <Grid item lg={4} xs={4}>
                                    <MetricBox
                                        metric={
                                            '$' +
                                            numberFormatter(
                                                earningsTotals.totalEarnings_Dollars,
                                                2,
                                            )
                                        }
                                        icon={<CashIcon></CashIcon>}
                                        title={'USD Dividends Earned'}
                                    ></MetricBox>
                                </Grid>

                                <Grid item lg={4} xs={4}>
                                    <MetricBox
                                        metric={numberFormatter(
                                            generationTotals.totalGeneration_kWh *
                                                generationMetaData.co2_per_kWh,
                                            3,
                                        )}
                                        icon={<LeafIcon />}
                                        title={'LBS Carbon Averted'}
                                    ></MetricBox>
                                </Grid>

                                <Grid item lg={4} xs={4}>
                                    <MetricBox
                                        metric={numberFormatter(
                                            generationTotals.totalGeneration_kWh,
                                            3,
                                        )}
                                        icon={<PowerIcon />}
                                        title={'kWh Generated'}
                                    ></MetricBox>
                                </Grid>
                            </Grid>

                            <Stack direction={'row'}></Stack>

                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Real Time Data
                                </Typography>
                            </ContentDivider>

                            <RealTimeContent
                                facility={nonNullFacility}
                                transfers={transfers.map(transferTransformer)}
                                generation={generation}
                                dataStale={dataStale}
                                message={subtitle}
                            ></RealTimeContent>
                        </Stack>
                    }
                ></SideBarView>

                <ContentDivider>
                    <Typography variant={'monoButton' as any}>
                        Recent Transactions
                    </Typography>
                </ContentDivider>
                <div style={{height: '500px'}}>
                    <TransferDataGrid
                        transfers={transfers}
                        loading={loading}
                    ></TransferDataGrid>
                </div>

                <SideBarView
                    drawerPosition={'left'}
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
                                        icon: <CalendarIcon></CalendarIcon>,
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
                                        icon: <PowerIcon></PowerIcon>,
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
                                        icon: <CashIcon></CashIcon>,
                                    },
                                ]}
                            ></IconAccordian>

                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Details
                                </Typography>
                            </ContentDivider>

                            <div>
                                <Grid container spacing={4}>
                                    <Grid item lg={6} xs={12}>
                                        <MetricComponent
                                            title={'Economics'}
                                            valuePairs={[
                                                {
                                                    metric: 'Investor Funds',
                                                    value: currencyFormatter(
                                                        nonNullFacility
                                                            .economics
                                                            .cost_dollars,
                                                    ),
                                                },
                                                {
                                                    metric: 'Hold Term',
                                                    value:
                                                        nonNullFacility
                                                            .economics
                                                            .ppaDuration ||
                                                        'NA',
                                                },
                                                {
                                                    metric: 'Estimated ROI',
                                                    value: '7.0%',
                                                },
                                            ]}
                                        ></MetricComponent>
                                    </Grid>

                                    <Grid item lg={6} xs={12}>
                                        <MetricComponent
                                            title={'Specifications'}
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
                                        />
                                    </Grid>
                                </Grid>
                            </div>

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
