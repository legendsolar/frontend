import { TimelineComponent } from "@project/components/timeline/timeline_component";
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
  SunIcon,
} from "@project/components/icons/emoji_icons";

import { PanelDisplay } from "@project/components/panels/panel_display";

import { Component, Divider } from "@project/components/basics";
import { MetricBox } from "@project/components/gauges/metric_box";

import { faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { useThemeColor } from "@project/components/utils";
import { ShareSocial } from "../share/share_social";
import { ClickToCopyButton } from "../buttons/click_to_copy_button";

export interface WaitlistPageProps {
  waitlistPosn: number;
  referralLink: string;
}

export const WaitlistPage = ({
  waitlistPosn,
  referralLink,
}: WaitlistPageProps) => {
  return (
    <WebflowView>
      <Stack>
        <SunIcon />
        <Typography variant={"headline2" as any}>
          You're signed up for early access.
        </Typography>
        <Typography variant={"headline2" as any}>
          <Typography variant={"headline2" as any} color={"grassGreen.main"}>
            {numberFormatter(waitlistPosn)}
          </Typography>
          {" people ahead of you."}
        </Typography>
        <Typography variant={"subtitle1" as any}>
          Get access even sooner by referring your friends. The more friends
          that join, the sooner you’ll get access.
        </Typography>

        <ContentDivider>
          <Typography variant={"monoButton" as any}>
            Share Via Social
          </Typography>
        </ContentDivider>

        <ShareSocial shareUrl={referralLink}></ShareSocial>

        <ContentDivider>
          <Typography variant={"monoButton" as any}>
            Share Direct Link
          </Typography>
        </ContentDivider>

        <ClickToCopyButton copyText={referralLink} />

        <Typography variant={"smallHeadline" as any}>
          {
            "Once we are ready to launch, we’ll be in touch and you’ll be first to know."
          }
        </Typography>
      </Stack>
    </WebflowView>
  );
};

export default WaitlistPage;
