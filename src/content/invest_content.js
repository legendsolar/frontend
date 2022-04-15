import {Box, Typography, Paper, Stack, Button, Grid} from '@mui/material';
import DefaultComponent from '../components/utils/default_component';
import SolarPicture from '../assets/solar_frame.png';
import PanelsSvg from '../components/icons/panels_svg';
import {useTheme} from '@mui/material';
import MetricList from '../components/summary/metric_list';
import investmentOpportunities from '../utils/asset_data';
import ErrorComponent from '../components/errors/error_component';
import DocumentIcon from '../components/icons/document_icon';

const InvestContent = ({assetId}) => {
    const theme = useTheme();
    const asset = investmentOpportunities[assetId];

    if (!asset) {
        return <ErrorComponent></ErrorComponent>;
    }

    return (
        <Stack spacing={4}>
            <DefaultComponent>
                <Stack spacing={4}>
                    <Stack>
                        <Typography variant="smallHeadline">
                            Execuive Summary
                        </Typography>
                        <Typography variant="headline2">
                            {asset.title}
                        </Typography>
                    </Stack>
                    <Typography variant="body">
                        Legends Incorporated is offering equity in four separate
                        commercial solar facilities to accredited investors.
                    </Typography>
                    <Typography variant="body">
                        Two facilities are in in New Jersey and two in
                        California. Each solar facility is on an ‘Extra Space
                        Mini Storage’ managed property owned by the REIT Merit
                        Hill Capital.
                    </Typography>

                    <Typography variant="body">
                        Merit Hill is a leading self-storage owner with more
                        than 200 properties in 33 states. Extra Space Storage
                        manages and operates dozens of Merit Hill properties.
                    </Typography>

                    <Typography variant="body">
                        Once operational, this facility will earn a stream of
                        payments from Extra Space as well as tax benefits.
                        Payments will be fixed, regardless of solar
                        productivity. The panels are covered by an installation,
                        equipment, and workmanship warranty for the full
                        duration of the holding period.
                    </Typography>

                    <Typography variant="subtitle2">
                        To effectively monetize the tax benefits this investment
                        provides, you should meet the following criteria:
                    </Typography>

                    <Typography variant="subtitle1">
                        One | Taxable income
                    </Typography>

                    <Typography variant="body2">
                        You can only access the tax benefits of this investment
                        if you are able to deduct significant tax benefits.
                    </Typography>

                    <Typography variant="subtitle1">
                        Two | High tax rate
                    </Typography>

                    <Typography variant="body2">
                        The higher your tax rate, the more efficiently you will
                        be able to monetize the special depreciation benefits of
                        this investment.
                    </Typography>
                </Stack>
            </DefaultComponent>

            <Grid
                container
                columnSpacing={{xs: 0, lg: 4}}
                rowSpacing={{xs: 4, lg: 0}}
            >
                <Grid
                    item
                    xs={12}
                    lg={6}
                    sx={{
                        ml: {lg: -4},
                        mt: {xs: -4, lg: 0},
                    }}
                >
                    <DefaultComponent>
                        <Stack spacing={4}>
                            <Typography variant="smallHeadline">
                                Economics
                            </Typography>

                            <MetricList
                                valuePairs={[
                                    {
                                        metric: 'Investor Funds',
                                        value: '$131,000',
                                    },

                                    {
                                        metric: 'Hold Term',
                                        value: '7 years',
                                    },

                                    {
                                        metric: 'Estimated ROI',
                                        value: '10.0%',
                                    },
                                ]}
                                dividers={true}
                            ></MetricList>
                        </Stack>
                    </DefaultComponent>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <DefaultComponent>
                        <Stack spacing={4}>
                            <Typography variant="smallHeadline">
                                Specifications
                            </Typography>

                            <MetricList
                                valuePairs={[
                                    {
                                        metric: 'Number of Panels',
                                        value: '114',
                                    },

                                    {
                                        metric: 'Make & Model',
                                        value: 'Phono Solar 400W',
                                    },

                                    {
                                        metric: 'Watts Installed',
                                        value: '46,600',
                                    },
                                ]}
                                dividers={true}
                            ></MetricList>
                        </Stack>
                    </DefaultComponent>
                </Grid>
            </Grid>

            <DefaultComponent>
                <Stack spacing={4}>
                    <Typography variant="smallHeadline">
                        A note on tax benefits
                    </Typography>

                    <Typography variant="body2">
                        Up to ~55% of net return will be attributable to tax
                        incentives. The remaining return is derived from power
                        purchase payments from Merit Hill. These power purchase
                        payments are shielded from federal income taxes via
                        depreciation benefits.
                    </Typography>
                </Stack>
            </DefaultComponent>

            <DefaultComponent>
                <Stack direction={'row'}>
                    <DocumentIcon
                        color={theme.palette.skyBlue.main}
                        darkColor={theme.palette.skyBlue.dark}
                    ></DocumentIcon>
                    <Stack>
                        <Typography variant="smallHeadline">
                            Legends Santa Rosa Solar Pro Forma PDF
                        </Typography>

                        <Stack direction={'row'}>
                            <DownloadIcon></DownloadIcon>
                            <Typography variant="label">
                                Click to download
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </DefaultComponent>

            <DefaultComponent>
                <Stack spacing={4}>
                    <Typography variant="smallHeadline">Documents</Typography>

                    <DocumentComponent
                        documents={[
                            {
                                title: 'Pro Forma',
                                color: 'skyBlue',
                            },
                            {
                                title: 'Purchase Agreement',
                                color: 'pencilYellow',
                            },
                            {
                                title: 'Billing Agreement',
                                color: 'eraserRed',
                            },
                        ]}
                    ></DocumentComponent>
                </Stack>
            </DefaultComponent>
        </Stack>
    );
};

export default InvestContent;
