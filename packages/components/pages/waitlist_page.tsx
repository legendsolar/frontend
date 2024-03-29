import { TimelineComponent } from "@project/components/timeline/timeline_component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WebflowView } from "@project/components/views/webflow_view";
import { MetricList } from "@project/components/metrics/metric_list";
import { PlusMinusNumber } from "@project/components/inputs/plus_minus_number";
import { LinearGauge } from "@project/components/gauges/linear_gauge";
import { Stack, Typography, Box, Grid, Button } from "@mui/material";
import { ContentDivider } from "@project/components/basics/content_divider";
import { SunIcon } from "@project/components/icons/emoji_icons";
import { ShareSocial } from "../share/share_social";
import { ClickToCopyButton } from "../buttons/click_to_copy_button";
import { States } from "../nav/webflow_nav_bar";
import { Component } from "../basics";
import { PanelDisplay } from "../panels";

export interface WaitlistPageProps {
  waitlistPosn: string;
  referralLink: string;
  panelsReserved: number;
}

export const WaitlistPage = ({
  waitlistPosn,
  referralLink,
  panelsReserved,
}: WaitlistPageProps) => {
  return (
    <WebflowView>
      <Stack spacing={12}>
        <Stack>
          <SunIcon />
          <Typography variant={"headline2" as any}>
            You're signed up for early access.
          </Typography>
          <Typography variant={"headline2" as any}>
            <Typography variant={"headline2" as any} color={"grassGreen.main"}>
              {waitlistPosn}
            </Typography>
            {" people ahead of you."}
          </Typography>
          <Typography variant={"subtitle1" as any}>
            Get access even sooner by referring your friends. The more friends
            that join, the sooner you’ll get access.
          </Typography>
        </Stack>
        <div>
          <Grid container columnSpacing={12} rowSpacing={12}>
            <Grid item md={12} lg={8}>
              <Component standardWidth={false} sx={{ height: "100%" }}>
                <Typography
                  variant="headline2"
                  sx={{ display: { md: "none", lg: "inline" } }}
                >
                  You reserved{" "}
                  <Typography variant="headline2" color={"legendaryGreen.main"}>
                    {panelsReserved} panels{" "}
                  </Typography>
                </Typography>

                <PanelDisplay
                  panelRows={3}
                  panelWidth={10}
                  hidePanels={false}
                  currentPanelSelectedCount={panelsReserved}
                  onPanelCountUpdate={() => {}}
                  interaction={false}
                ></PanelDisplay>
              </Component>
            </Grid>

            <Grid item md={12} lg={4}>
              <ShareSocial shareUrl={referralLink}></ShareSocial>
            </Grid>
          </Grid>
        </div>

        <ContentDivider>
          <Typography variant={"monoButton" as any}>
            Share Direct Link
          </Typography>
        </ContentDivider>

        <ClickToCopyButton copyText={referralLink} />

        <Typography variant={"smallHeadline" as any} sx={{ mt: "20px" }}>
          {
            "Once we are ready to launch, we’ll be in touch and you’ll be first to know."
          }
        </Typography>
      </Stack>
    </WebflowView>
  );
};

export default WaitlistPage;
