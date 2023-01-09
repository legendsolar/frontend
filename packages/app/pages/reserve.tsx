import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WebflowView } from "@project/components/views/webflow_view";
import { MetricList } from "@project/components/metrics/metric_list";
import { PlusMinusNumber } from "@project/components/inputs/plus_minus_number";
import { LinearGauge } from "@project/components/gauges/linear_gauge";
import { Stack, Typography, Box, Grid, Button } from "@mui/material";
import { ContentDivider } from "@project/components/basics/content_divider";
import SideBarView from "@project/components/views/side_bar_view";
import { InvestmentSupportComponent } from "@project/components/invest/investment_support_component";
import IconAccordian from "@project/components/utils/icon_accordian";
import { DocumentListComponent } from "@project/components/documents/document_list_component";
import { numberFormatter, currencyFormatter } from "@p/utils/number_formatter";
import {
  CalendarIcon,
  CashIcon,
  PowerIcon,
  LeafIcon,
} from "@project/components/icons/emoji_icons";

import { PanelDisplay } from "@project/components/panels/panel_display";

import { siteCopy } from "../utility/copy";
import { Component, Divider } from "@project/components/basics";
import { MetricBox } from "@project/components/gauges/metric_box";
import { useReservations } from "utility/use_reservations";

import { faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { useThemeColor } from "@project/components/utils";

export const ReservePanelPage = () => {
  const {
    loading,
    currentPanels,
    setCurrentPanels,
    costPerPanel,
    currentReservedPanels,
    maxPanelReservations,
  } = useReservations();

  console.log({ loading, currentReservedPanels });

  if (loading) {
    return <div></div>;
  }

  return (
    <WebflowView>
      <Stack>
        <Stack>
          <Typography variant={"headline2" as any}>
            Reserve Panels to Claim Early Access
          </Typography>
          <Typography
            variant={"subtitle1" as any}
            sx={{ fontWeight: 300, color: "blackDawn.main", fontSize: 24 }}
          >
            We expect to have online solar investments available within the next
            3 months. Until then, you can reserve panels and be first to invest
            once we launch.
          </Typography>
        </Stack>

        <SideBarView
          drawerPosition={"right"}
          constrainedBreakpoint="lg"
          drawer={
            <Stack>
              <Component
                shadow
                background
                standardWidth={false}
                sx={{ width: "100%" }}
              >
                <Typography variant={"smallHeadline" as any}>
                  Reserve Panels
                </Typography>

                <Divider />

                <MetricList
                  valuePairs={[
                    {
                      metric: (
                        <Stack direction="row">
                          <Typography
                            variant={"subtitle3" as any}
                            color="blackDawn.main"
                          >
                            {"Cost Per Panel"}
                          </Typography>
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            style={{ color: useThemeColor("blackDawn") }}
                          />
                        </Stack>
                      ),

                      value: currencyFormatter(costPerPanel),
                    },
                    {
                      metric: "Total Investment",
                      value: currencyFormatter(currentPanels * costPerPanel),
                    },
                  ]}
                ></MetricList>

                <Stack alignItems={"center"}>
                  <PlusMinusNumber
                    state={currentPanels}
                    incState={() => setCurrentPanels(currentPanels + 1)}
                    decState={() => setCurrentPanels(currentPanels - 1)}
                  />
                </Stack>

                <Button variant={"primary" as any}>Reserve Panels</Button>

                <Stack alignItems={"center"}>
                  <Typography
                    variant={"subtitle3" as any}
                    color={"blackDawn.main"}
                  >
                    {"You won't be charged yet"}
                  </Typography>
                </Stack>
              </Component>
            </Stack>
          }
          mainContent={
            <Component background shadow standardWidth={false}>
              <Stack>
                <LinearGauge
                  current={currentReservedPanels + currentPanels}
                  max={maxPanelReservations}
                  color={"legendaryGreen.main"}
                />
                <PanelDisplay
                  panelRows={3}
                  panelWidth={10}
                  hidePanels={true}
                  currentPanelSelectedCount={currentPanels}
                  onPanelCountUpdate={(newCount) => setCurrentPanels(newCount)}
                ></PanelDisplay>
                <ContentDivider>
                  <Typography
                    variant={"monoButton" as any}
                    color="legendaryGreen.main"
                  >
                    Estimated Impact
                  </Typography>
                </ContentDivider>
                <Grid container>
                  <Grid item lg={4} xs={4}>
                    <MetricBox
                      metric={"$" + numberFormatter(currentPanels * 10, 2)}
                      icon={<CashIcon></CashIcon>}
                      title={"USD Dividends Earned"}
                    ></MetricBox>
                  </Grid>

                  <Grid item lg={4} xs={4}>
                    <MetricBox
                      metric={numberFormatter(currentPanels * 10, 3)}
                      icon={<LeafIcon />}
                      title={"LBS Carbon Averted"}
                    ></MetricBox>
                  </Grid>

                  <Grid item lg={4} xs={4}>
                    <MetricBox
                      metric={numberFormatter(currentPanels * 10, 3)}
                      icon={<PowerIcon />}
                      title={"kWh Generated"}
                    ></MetricBox>
                  </Grid>
                </Grid>
              </Stack>
            </Component>
          }
        ></SideBarView>

        <SideBarView
          drawerPosition={"left"}
          constrainedBreakpoint="lg"
          drawer={
            <Box sx={{ mt: 4 }}>
              <ContentDivider>
                <Typography
                  variant={"monoButton" as any}
                  color="legendaryGreen.main"
                >
                  Your Support Team
                </Typography>
              </ContentDivider>
              <InvestmentSupportComponent
                title={"Nera Lerner"}
                subtitle={"Solar Investing Specialist"}
                description={
                  "Nera is here to share the basics of online solar investing. You’ll have a specilist for the term of your investment. "
                }
                sx={{ mt: 4 }}
              ></InvestmentSupportComponent>
            </Box>
          }
          mainContent={
            <Stack>
              <ContentDivider>
                <Typography
                  variant={"monoButton" as any}
                  color="legendaryGreen.main"
                >
                  Summary
                </Typography>
              </ContentDivider>

              <IconAccordian
                items={[
                  {
                    title: "7 year term",
                    content: (
                      <Typography variant={"description" as any}>
                        {siteCopy.aboutSevenYearTerm}
                      </Typography>
                    ),
                    icon: <CalendarIcon></CalendarIcon>,
                  },
                  {
                    title: "Legends Rooftop monitoring",
                    content: (
                      <Typography variant={"description" as any}>
                        {siteCopy.aboutRooftopMonitoring}
                      </Typography>
                    ),
                    icon: <PowerIcon></PowerIcon>,
                  },
                  {
                    title: "Investment Tax Credit",
                    content: (
                      <Typography variant={"description" as any}>
                        {siteCopy.aboutInvestmentTaxCredit}
                      </Typography>
                    ),
                    icon: <CashIcon></CashIcon>,
                  },
                ]}
              ></IconAccordian>

              <ContentDivider>
                <Typography variant={"monoButton" as any}>Details</Typography>
              </ContentDivider>
            </Stack>
          }
        ></SideBarView>
      </Stack>
    </WebflowView>
  );
};

export default ReservePanelPage;
