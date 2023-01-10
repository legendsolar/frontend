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
} from "@project/components/icons/emoji_icons";

import { PanelDisplay } from "@project/components/panels/panel_display";

import { siteCopy } from "../utility/copy";
import { Component, Divider } from "@project/components/basics";
import { MetricBox } from "@project/components/gauges/metric_box";
import {
  localStorePanelsReserved,
  useReservations,
} from "utility/use_reservations";

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

  const onReservePanels = () => {
    localStorePanelsReserved(currentPanels);
  };

  return (
    <WebflowView>
      <Stack>
        <Typography variant={"headline2" as any}>
          You're signed up for early access
        </Typography>
      </Stack>
    </WebflowView>
  );
};

export default ReservePanelPage;
