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

export interface WaitlistPageProps {
  waitlistPosn: string;
  referralLink: string;
  onLogout(): void;
  onLogin(): void;
  onGetEarlyAccess(): void;
  onCheckStatus(): void;
}

export const WaitlistPage = ({
  waitlistPosn,
  referralLink,
  onLogout,
  onLogin,
  onGetEarlyAccess,
  onCheckStatus,
}: WaitlistPageProps) => {
  return (
    <WebflowView
      state={States.LOGGED_IN_NO_PANELS}
      onCheckStatus={onCheckStatus}
      onLogin={onLogin}
      onLogout={onLogout}
      onGetEarlyAccess={onGetEarlyAccess}
    >
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
