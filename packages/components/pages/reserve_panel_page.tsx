import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { TimelineComponent } from "@project/components/timeline/timeline_component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WebflowView } from "@project/components/views/webflow_view";
import { MetricList } from "@project/components/metrics/metric_list";
import { PlusMinusNumber } from "@project/components/inputs/plus_minus_number";
import { LinearGauge } from "@project/components/gauges/linear_gauge";
import { Stack, Typography, Box, Grid, Button } from "@mui/material";
import { IconButton } from "../buttons/icon_button";
import { ContentDivider } from "@project/components/basics/content_divider";
import SideBarView from "@project/components/views/side_bar_view";
import { InvestmentSupportComponent } from "@project/components/invest/investment_support_component";
import IconAccordian from "@project/components/utils/icon_accordian";
import { numberFormatter, currencyFormatter } from "@p/utils/number_formatter";
import {
  CalendarIcon,
  CashIcon,
  PowerIcon,
  LeafIcon,
  MagGlassIcon,
} from "@project/components/icons/emoji_icons";

import FactorySolar from "@project/components/assets/images/factory_solar.png";
import ParkingSolar from "@project/components/assets/images/parking_lot_solar.png";

import { PanelDisplay } from "@project/components/panels/panel_display";

import { Component, Divider } from "@project/components/basics";
import { MetricBox } from "@project/components/gauges/metric_box";

import { faInfoCircle, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { useThemeColor } from "@project/components/utils";
import { siteCopy } from "../content/copy";
import { Image } from "../utils/image";
import { BorderRight } from "@mui/icons-material";
import { States } from "../nav/webflow_nav_bar";
import { EXTERNAL_LINKS } from "@p/utils/webflow/webflowLinking";
export interface ReservePanelPageProps {
  currentPanels: number;
  setCurrentPanels(panels: number): void;
  confirmPanels(): void;
  currentReservedPanels: number;
  maxPanelReservations: number;
  costPerPanel: number;
  onLogout(): void;
  onLogin(): void;
  onGetEarlyAccess(): void;
  onCheckStatus(): void;
}

export const ReservePanelPage = ({
  currentPanels,
  setCurrentPanels,
  confirmPanels,
  currentReservedPanels,
  maxPanelReservations,
  costPerPanel,
  onLogout,
  onLogin,
  onGetEarlyAccess,
  onCheckStatus,
}: ReservePanelPageProps) => {
  return (
    <WebflowView
      state={States.RESERVE_PANEL}
      onCheckStatus={onCheckStatus}
      onLogin={onLogin}
      onLogout={onLogout}
      onGetEarlyAccess={onGetEarlyAccess}
    >
      <Stack spacing={6}>
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
          constrainedDrawerPostion="bottom"
          drawer={
            <Stack
              sx={{
                width: {
                  lg: "440px",
                  md: "100%",
                },
              }}
            >
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

                <Button variant={"primary" as any} onClick={confirmPanels}>
                  Reserve Panels
                </Button>

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
            <Component
              background
              shadow
              standardWidth={false}
              sx={{
                width: "100%",
              }}
            >
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

                <Box sx={{ display: { md: "none", lg: "inline" } }}>
                  <ContentDivider>
                    <Typography variant={"subtitle3" as any}>
                      Estimated Annual Impact
                    </Typography>
                  </ContentDivider>
                  <Grid container>
                    <Grid item lg={4} xs={4}>
                      <MetricBox
                        metric={"$" + numberFormatter(currentPanels * 46, 2)}
                        icon={<CashIcon></CashIcon>}
                        title={"USD Dividends Earned"}
                      ></MetricBox>
                    </Grid>

                    <Grid item lg={4} xs={4}>
                      <MetricBox
                        metric={numberFormatter(currentPanels * 370, 3)}
                        icon={<LeafIcon />}
                        title={"LBS Carbon Averted"}
                      ></MetricBox>
                    </Grid>

                    <Grid item lg={4} xs={4}>
                      <MetricBox
                        metric={numberFormatter(currentPanels * 440, 3)}
                        icon={<PowerIcon />}
                        title={"kWh Generated"}
                      ></MetricBox>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Component>
          }
        ></SideBarView>

        <SideBarView
          drawerPosition={"left"}
          constrainedBreakpoint="lg"
          constrainedDrawerPostion="bottom"
          drawer={
            <Box>
              <ContentDivider>
                <Typography variant={"subtitle3" as any}>
                  Your Support Team
                </Typography>
              </ContentDivider>
              <InvestmentSupportComponent
                title={"Nera Lerner"}
                subtitle={"Solar Investing Specialist"}
                description={
                  "Ask me about the financial profile, risks, and benefits of online solar investing."
                }
                sx={{ mt: 4 }}
              ></InvestmentSupportComponent>
            </Box>
          }
          mainContent={
            <Stack spacing={6}>
              <ContentDivider>
                <Typography variant={"subtitle3" as any}>Summary</Typography>
              </ContentDivider>

              <Stack>
                <Typography variant={"body" as any}>
                  With Legends, you’ll purchase solar panels on a commercial
                  solar farm - think warehouse rooftop (not a suburban home) and
                  earn cash as you generate and sell electricity.
                  <br></br>
                  <br></br>
                  Online solar investing with Legends will be available in the
                  next few months. Reserve panels today to get early access.
                </Typography>

                <Stack
                  spacing={"16px"}
                  sx={{
                    flexDirection: {
                      lg: "row",
                      md: "column",
                    },
                    alignItems: {
                      lg: "flex-end",
                      md: "flex-start",
                    },
                    justifyContent: {
                      lg: "flex-end",
                    },
                    gap: "16px",
                  }}
                >
                  <Image
                    src={FactorySolar}
                    style={{
                      width: "260px",
                      height: "260px",

                      borderRadius: "5px",
                    }}
                  />

                  <Box
                    style={{
                      marginTop: "0px",
                      padding: "0px",

                      height: "260px",
                    }}
                    sx={{
                      display: {
                        md: "none",
                        lg: "inline",
                      },
                    }}
                  >
                    <Image
                      src={ParkingSolar}
                      style={{
                        width: "260px",
                        height: "260px",
                        borderRadius: "5px",
                      }}
                    />
                  </Box>

                  <Typography
                    variant={"body" as any}
                    sx={{
                      display: {
                        md: "none",
                        lg: "inline",
                      },
                    }}
                  >
                    Your panels will be similar to the ones pictured
                  </Typography>
                </Stack>
              </Stack>

              <ContentDivider>
                <Typography variant={"subtitle3" as any}>Features</Typography>
              </ContentDivider>

              <IconAccordian
                items={[
                  {
                    title: "Carefully selected solar panels",
                    content: (
                      <Stack spacing={"16px"}>
                        <Typography variant={"body" as any}>
                          {siteCopy.aboutSevenYearTerm}
                        </Typography>
                        <IconButton
                          iconPosition="right"
                          variant="bubble"
                          target="_blank"
                          href={EXTERNAL_LINKS.LEARN.PANEL_SELECTION}
                          label="How does Legends Solar Choose solar panels?"
                          icon={<FontAwesomeIcon icon={faArrowRight} />}
                        />
                      </Stack>
                    ),
                    icon: <MagGlassIcon />,
                  },
                  {
                    title: "Monthly cash earnings",
                    content: (
                      <Typography variant={"body" as any}>
                        {`Each month, the cash earnings produced by your panels will be transferred to you. All dividend payments earned by your solar panels will be sent to your Legends Wallet. When you receive dividends from solar panels on Legends, it is like you literally \‘turned sunshine into cash\’ – since all the cash you earn comes from the sale of 100% renewable energy.`}
                      </Typography>
                    ),
                    icon: <CashIcon />,
                  },
                  {
                    title: "Real-time monitoring",
                    content: (
                      <Typography variant={"body" as any}>
                        {`Your solar panels generate data on how much electricity they produce – we use Rooftop to make that data accessible to you. This information is put in context with your carbon impact and earnings, so you’ll always know what positive effect your investment is having in the world and how you are benefiting from it.`}
                      </Typography>
                    ),
                    icon: <PowerIcon />,
                  },
                ]}
              ></IconAccordian>

              <Stack
                sx={{
                  display: {
                    md: "none",
                    lg: "inline",
                  },
                }}
                spacing={6}
              >
                <ContentDivider>
                  <Typography variant={"subtitle3" as any}>Timeline</Typography>
                </ContentDivider>

                <div></div>

                <Typography variant={"smallHeadline" as any}>
                  Solar panels will be available in 3-6 months
                </Typography>

                <div></div>

                <Typography variant={"body" as any}>
                  Get Early Access to be first to know when we have available
                  solar panels. It’s no commitment — before you invest, you’ll
                  be provided a detailed finance overview with forecast returns
                  and other important information.
                </Typography>

                <TimelineComponent
                  steps={[
                    {
                      title: "We identify a solar project to purchase",
                      description: `We select solar projects based on their risk profile and quality of construction. Legends works with experienced finance partners to identify strong projects to acquire for Legends clients.`,
                      linkBubble: (
                        <IconButton
                          href={EXTERNAL_LINKS.LEARN.PANEL_SELECTION}
                          target="_blank"
                          variant="bubble"
                          color="whiteHaze"
                          label="Panel selection process"
                          iconPosition="right"
                          icon={<FontAwesomeIcon icon={faArrowRight} />}
                        ></IconButton>
                      ),
                    },

                    {
                      title: "Review Offering Prospectus",
                      description: `Once panels are available, we’ll send you an investment overview with detailed information about the opportunity. You’ll have access to projected returns and other traits of the panels.`,
                    },
                    {
                      title: "Invest in solar panels",
                      description: `After reviewing the documentation we’ll provide, you’ll be able to purchase your first solar panels. Invest in one panel, or a whole rooftop’s worth!`,
                      linkBubble: (
                        <IconButton
                          href={EXTERNAL_LINKS.LEARN.PANEL_COST}
                          target="_blank"
                          variant="bubble"
                          color="whiteHaze"
                          label="Panels on Legends Solar"
                          iconPosition="right"
                          icon={<FontAwesomeIcon icon={faArrowRight} />}
                        ></IconButton>
                      ),
                    },
                    {
                      title: "Monitor your productivity",
                      description: `With Legends Rooftop, you’ll see your panel’s real time productivity — the cash you earn, the power you generate, and the carbon impact you create!`,
                      linkBubble: (
                        <IconButton
                          href={EXTERNAL_LINKS.LEARN.ROOFTOP_DASHBOARD}
                          target="_blank"
                          variant="bubble"
                          color="whiteHaze"
                          label="Legends Rooftop Dashboard"
                          iconPosition="right"
                          icon={<FontAwesomeIcon icon={faArrowRight} />}
                        ></IconButton>
                      ),
                    },
                  ]}
                ></TimelineComponent>
              </Stack>
            </Stack>
          }
        ></SideBarView>
      </Stack>
    </WebflowView>
  );
};

export default ReservePanelPage;
