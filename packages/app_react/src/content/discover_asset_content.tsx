import {Typography, Stack, Box, Button, Grid} from '@mui/material';
import {ContentDivider} from '@project/components/basics/content_divider';
import {BasicMap} from '@project/components/map/basic_map_component';
import {Component} from '@project/components/basics/component';
import SideBarView from '@project/components/views/side_bar_view';
import {InvestmentSupportComponent} from '@project/components/invest/investment_support_component';
import {IconAccordian} from '@project/components/utils/icon_accordian';
import {SideBar} from '@project/components/nav/sidebar_component';
import {MetricList} from '@project/components/metrics/metric_list';
import SmallPanelDisplaySVG from '@project/components/assets/images/small_panel_display.svg';
import PanelParkingLotPNG from '@project/components/assets/images/panel_parking_lot.png';
import PanelWarehousePNG from '@project/components/assets/images/panel_warehouse.png';
import {DocumentListComponent} from '@project/components/documents/document_list_component';
import {numberFormatter, currencyFormatter} from '@p/utils/number_formatter';
import LoadingContent from './loading_content';
import {ProspectiveAsset} from '@project/components/discovery/types';
import {formatAddress, formatAddressLine} from '@p/utils/address_formatter';
import {TimelineComponent} from '@project/components/timeline/timeline_component';
import {MapTerrain3D} from '@project/components/map/map_terrain_3d';
import {
    CalendarIcon,
    CashIcon,
    HammerIcon,
    PowerIcon,
    UmbrellaIcon,
} from '@project/components/icons/emoji_icons';
import {MetricComponent} from '@project/components/metrics/metric_component';
import {TooltipMarker} from '@project/components/map/tooltip_marker';
interface DiscoverAssetContentProps {
    loading: boolean;
    asset: ProspectiveAsset;
}

const DiscoverAssetContent = ({
    loading = false,
    asset,
}: DiscoverAssetContentProps) => {
    if (loading) return <LoadingContent />;

    const address = formatAddressLine(asset.address);

    return (
        <div>
            <Stack sx={{mb: 3}}>
                <Typography variant={'headline2' as any}>
                    {asset.title}
                </Typography>

                <Stack direction="row" justifyContent={'space-between'}>
                    <Typography variant={'monoButton' as any}>
                        {address}
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
                    lat={asset.location?.lat || 41.375094}
                    lng={asset.location?.lng || -74.692663}
                    width={'100%'}
                    height={'320px'}
                    zoom={13}
                    initBearing={0}
                    markers={[
                        <TooltipMarker
                            location={asset.location}
                            title={asset.title}
                        ></TooltipMarker>,
                    ]}
                ></MapTerrain3D>
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
                                        {asset.numberOfPanels + ' panels'}
                                    </Typography>
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
                                            metric: 'Location',
                                            value: formatAddress(asset.address),
                                        },
                                        {
                                            metric: 'Panels',
                                            value: numberFormatter(
                                                asset.numberOfPanels,
                                            ),
                                        },
                                        {
                                            metric: 'Watts Installed',
                                            value: numberFormatter(
                                                asset.capacity_kW,
                                            ),
                                        },
                                        {
                                            metric: 'Total Investment',
                                            value: currencyFormatter(
                                                asset.minInvestment,
                                            ),
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
                                    Summary
                                </Typography>
                            </ContentDivider>

                            <Typography variant={'body' as any}>
                                {asset.summary}
                            </Typography>

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
                                            <Typography variant={'body' as any}>
                                                {asset.about.yearTerm}
                                            </Typography>
                                        ),
                                        icon: <CalendarIcon></CalendarIcon>,
                                    },
                                    {
                                        title: 'Legends Rooftop monitoring',
                                        content: (
                                            <Typography variant={'body' as any}>
                                                {asset.about.rooftopMonitoring}
                                            </Typography>
                                        ),
                                        icon: <PowerIcon />,
                                    },
                                    {
                                        title: 'Investment Tax Credit',
                                        content: (
                                            <Typography variant={'body' as any}>
                                                {
                                                    asset.about
                                                        .investmentTaxCredit
                                                }
                                            </Typography>
                                        ),
                                        icon: <CashIcon />,
                                    },
                                    {
                                        title: 'Rain or Shine Contract',
                                        content: (
                                            <Typography variant={'body' as any}>
                                                {asset.about.rainOrShine}
                                            </Typography>
                                        ),
                                        icon: <UmbrellaIcon></UmbrellaIcon>,
                                    },
                                    {
                                        title: 'Full Workmanship Warrenty',
                                        content: (
                                            <Typography variant={'body' as any}>
                                                {
                                                    asset.about
                                                        .workmanshipWarrenty
                                                }
                                            </Typography>
                                        ),
                                        icon: <HammerIcon />,
                                    },
                                ]}
                            ></IconAccordian>
                        </Stack>
                    }
                    drawerPosition={'right'}
                ></SideBarView>

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
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Investment Timeline
                                </Typography>
                            </ContentDivider>

                            <TimelineComponent
                                steps={[
                                    {
                                        title:
                                            'We identify a solar project to fund',
                                        description:
                                            'We select solar projects based on their risk profile and quality of construction.',
                                        linkBubble: (
                                            <Button
                                                variant={'mini' as any}
                                                href={
                                                    'https://www.legends.solar/learn/selection'
                                                }
                                                target="_blank"
                                                sx={{
                                                    width: 'fit-content',
                                                    backgroundColor:
                                                        'white.main',
                                                }}
                                            >
                                                Asset Selection Process
                                            </Button>
                                        ),
                                    },

                                    {
                                        title: 'Review Offering Prospectus',
                                        description:
                                            "Once we are ready to subscribe a solar facility, we'll publish a prospectus and other documents.",
                                    },

                                    {
                                        title: 'Subscribe to Solar Offering',
                                        description:
                                            'After reviewing the prospectus, you can commit to an investment & enter your bank info.',
                                    },
                                    {
                                        title:
                                            'Complete Investment Transaction',
                                        description:
                                            "Once the investment is fully subscribed, you'll receive your 'panel' shares.",
                                        linkBubble: (
                                            <Button
                                                variant={'mini' as any}
                                                href={
                                                    'https://www.legends.solar/learn/cost'
                                                }
                                                target="_blank"
                                                sx={{
                                                    width: 'fit-content',
                                                    backgroundColor:
                                                        'white.main',
                                                }}
                                            >
                                                Shares on Legends Solar
                                            </Button>
                                        ),
                                    },
                                    {
                                        title:
                                            'View Productivity and Dividends',
                                        description:
                                            "You'll  see your investment's real time impact and receive dividends from your holding. ",

                                        linkBubble: (
                                            <Button
                                                variant={'mini' as any}
                                                href={
                                                    'https://www.legends.solar/learn/legends-solar'
                                                }
                                                target="_blank"
                                                sx={{
                                                    width: 'fit-content',
                                                    backgroundColor:
                                                        'white.main',
                                                }}
                                            >
                                                Legends Rooftop
                                            </Button>
                                        ),
                                    },
                                ]}
                            ></TimelineComponent>

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
                                                        asset.minInvestment,
                                                    ),
                                                },
                                                {
                                                    metric: 'Hold Term',
                                                    value: asset.holdTerm_years.toFixed(
                                                        0,
                                                    ),
                                                },
                                                {
                                                    metric: 'Estimated ROI',
                                                    value:
                                                        asset.estimatedROI.toFixed(
                                                            1,
                                                        ) + '%',
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
                                                    value: asset.numberOfPanels.toFixed(
                                                        0,
                                                    ),
                                                },
                                                {
                                                    metric: 'Make & model',
                                                    value: 'N/A',
                                                },
                                                {
                                                    metric: 'Watts Installed',
                                                    value: asset.capacity_kW.toFixed(
                                                        1,
                                                    ),
                                                },
                                            ]}
                                        ></MetricComponent>
                                    </Grid>
                                </Grid>
                            </div>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Documents
                                </Typography>
                            </ContentDivider>

                            <DocumentListComponent
                                documents={asset.documents}
                            ></DocumentListComponent>
                        </Stack>
                    }
                ></SideBarView>
            </Stack>
        </div>
    );
};

export default DiscoverAssetContent;
