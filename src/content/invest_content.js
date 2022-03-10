import { Box, Typography, Paper, Stack, Button, Grid } from "@mui/material";
import DefaultComponent from "../components/default_component";
import SolarPicture from "../assets/solar_frame.png";
import PanelsSvg from "../components/icons/panels_svg";
import { useTheme } from "@mui/material";
import MetricList from "../components/summary/metric_list";
import { DocumentIcon } from "../components/icons/document_icon";
import investmentOpportunities from "../utils/asset_data";
import ErrorComponent from "../components/errors/error_component";

const InvestContent = ({ assetId }) => {
    const theme = useTheme();
    const asset = investmentOpportunities[assetId];

    if (!asset) {
        return <ErrorComponent></ErrorComponent>;
    }

    return (
        <Stack spacing={4}>
            <DefaultComponent>
                <Stack>
                    <Typography variant="smallHeadline">
                        Execuive Summary
                    </Typography>
                    <Typography variant="headline2">{asset.title}</Typography>
                </Stack>
            </DefaultComponent>

            <DefaultComponent>
                <Typography variant="smallHeadline">Photography</Typography>
                <img style={{ width: "100%" }} src={SolarPicture}></img>
            </DefaultComponent>

            <DefaultComponent>
                <Stack spacing={4}>
                    <Typography variant="smallHeadline">
                        Legends Incorporated is offering equity in four separate
                        commercial solar facilities to accredited investors.
                    </Typography>
                    <Typography variant="body2">
                        Two facilities are in in New Jersey and two in
                        California. Each solar facility is on an ‘Extra Space
                        Mini Storage’ managed property owned by the REIT Merit
                        Hill Capital.
                    </Typography>

                    <Typography variant="body2">
                        Once operational, these facilities will earn a stream of
                        payments from Extra Space as well as tax benefits.
                        Payments will be fixed, regardless of solar
                        productivity.
                    </Typography>

                    <Typography variant="body2">
                        To effectively monetize the tax benefits this investment
                        provides, you should meet the following criteria:
                    </Typography>

                    <Typography variant="body2">
                        Up to ~55% of net return will be attributable to tax
                        incentives. The remaining return is derived from power
                        purchase payments from Merit Hill. These power purchase
                        payments are shielded from federal income taxes via
                        depreciation benefits. Please carefully review the
                        attached pro forma and discuss if it is right for you
                        with your financial advisors. As always, feel free to
                        reach out to me with additional questions.
                    </Typography>
                </Stack>
            </DefaultComponent>

            <DefaultComponent>
                <Stack spacing={4}>
                    <Typography variant="smallHeadline">
                        About Merit Hill and Extra Space
                    </Typography>

                    <Typography variant="body2">
                        Merit Hill is a leading self-storage owner/operator with
                        more than 200 properties in 33 states. Extra Space Mini
                        Storage manages and operates dozens of Merit Hill
                        properties. Once operational, these facilities will earn
                        a stream of payments from Extra Space as well as tax
                        benefits. Payments will be fixed, regardless of solar
                        productivity.
                    </Typography>

                    <Typography variant="subtitle1">
                        Merit Hill will both be the only source of revenue and
                        the purchaser of this facility after the 7 year holding
                        period.
                    </Typography>
                </Stack>
            </DefaultComponent>

            <Grid
                container
                columnSpacing={{ xs: 0, lg: 4 }}
                rowSpacing={{ xs: 4, lg: 0 }}
            >
                <Grid
                    item
                    xs={12}
                    lg={6}
                    sx={{
                        ml: { lg: -4 },
                        mt: { xs: -4, lg: 0 },
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
                                        metric: "Kilowatts",
                                        value: "450",
                                    },

                                    {
                                        metric: "Make & Model",
                                        value: "Panasonic Evervolt",
                                    },

                                    {
                                        metric: "Operating since",
                                        value: "July 2022",
                                    },
                                ]}
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
                                        metric: "Kilowatts",
                                        value: "450",
                                    },

                                    {
                                        metric: "Make & Model",
                                        value: "Panasonic Evervolt",
                                    },

                                    {
                                        metric: "Operating since",
                                        value: "July 2022",
                                    },
                                ]}
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

                    <Typography variant="subtitle1">
                        Please carefully review the attached pro forma and
                        discuss if it is right for you with your financial
                        advisors. As always, feel free to reach out to me with
                        additional questions.
                    </Typography>
                </Stack>
            </DefaultComponent>

            <DefaultComponent>
                <Stack spacing={4}>
                    <Typography variant="smallHeadline">Documents</Typography>

                    <Grid container spacing={2} sx={{ width: "100%" }}>
                        <Grid item xs={12} lg={4}>
                            <Stack
                                direction="row"
                                justifyContent={"flex-start"}
                                alignItems="center"
                                spacing={2}
                            >
                                <DocumentIcon
                                    color={theme.palette.skyBlue.main}
                                    darkColor={theme.palette.skyBlue.dark}
                                ></DocumentIcon>
                                <Typography variant="subtitle1">
                                    Prospectus
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} lg={4}>
                            <Stack
                                direction="row"
                                justifyContent={"flex-start"}
                                alignItems="center"
                                spacing={2}
                            >
                                <DocumentIcon
                                    color={theme.palette.pencilYellow.main}
                                    darkColor={theme.palette.pencilYellow.dark}
                                ></DocumentIcon>
                                <Typography variant="subtitle1">
                                    {`Subscription \nAgreement`}
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} lg={4}>
                            <Stack
                                direction="row"
                                justifyContent={"flex-start"}
                                alignItems="center"
                                spacing={2}
                            >
                                <DocumentIcon
                                    color={theme.palette.grassGreen.main}
                                    darkColor={theme.palette.grassGreen.dark}
                                ></DocumentIcon>
                                <Typography variant="subtitle1">
                                    {`Wiring \nInstructions`}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </DefaultComponent>
        </Stack>
    );
};

export default InvestContent;
