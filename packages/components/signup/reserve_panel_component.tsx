import { Component } from "../basics";
import { Typography, Stack, Button, Tooltip } from "@mui/material";
import { MetricList } from "../metrics/metric_list";
import { PlusMinusNumber } from "../inputs/plus_minus_number";
import { Divider } from "../basics";
import { currencyFormatter } from "@p/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { useThemeColor } from "../utils";
import { EXTERNAL_LINKS } from "@p/utils/webflow/webflowLinking";
import { ContentDivider } from "@project/components/basics/content_divider";
import { useReservations } from "@project/hooks/use_reservations";
import { useState } from "react";
import { Image } from "../utils/image";
import WomanPanelsSVG from "@project/components/assets/images/women_panel.svg";
import {
  KeepMeInTheLoopComponentDefault,
  Values,
} from "./keep_me_in_loop_component";

enum State {
  DEFAULT,
  KEEP_ME_IN_THE_LOOP,
  EMAIL_SUBMITTED,
}

interface Props {
  currentPanels: number;
  costPerPanel: number;
  setCurrentPanels(panels: number): void;
  confirmPanels(): void;
  onJustKeepMeInTheLoop(): void;
  onKeepMeInTheLoopSignUp(values: Values): Promise<void>;
  state: State;
}

const title = (state: State) => {
  switch (state) {
    case State.DEFAULT:
      return "Reserve Panels";
    case State.KEEP_ME_IN_THE_LOOP:
      return "Keep me in the loop";
    case State.EMAIL_SUBMITTED:
      return "Email submitted";
  }
};

export const ReservePanelComponent = ({
  currentPanels,
  costPerPanel,
  setCurrentPanels,
  confirmPanels,
  onJustKeepMeInTheLoop,
  onKeepMeInTheLoopSignUp,
  state,
}: Props) => {
  const content = (state: State) => {
    switch (state) {
      case State.DEFAULT:
        return [
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
                    <Tooltip
                      title={"Learn about cost per panel on Legends Solar"}
                    >
                      <Button
                        href={EXTERNAL_LINKS.LEARN.PANEL_COST}
                        target={"_blank"}
                        style={{ fontSize: "18px" }}
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          style={{ color: useThemeColor("blackDawn") }}
                        />
                      </Button>
                    </Tooltip>
                  </Stack>
                ),

                value: currencyFormatter(costPerPanel),
              },
              {
                metric: "Total Investment",
                value: currencyFormatter(currentPanels * costPerPanel),
              },
            ]}
          ></MetricList>,

          <Stack alignItems={"center"}>
            <PlusMinusNumber
              state={currentPanels}
              incState={() => setCurrentPanels(currentPanels + 1)}
              decState={() => setCurrentPanels(currentPanels - 1)}
            />
          </Stack>,

          <Button variant={"primary" as any} onClick={confirmPanels}>
            Reserve Panels
          </Button>,

          <ContentDivider>
            <Typography variant={"subtitle3" as any}>or</Typography>
          </ContentDivider>,

          <Button
            variant={"primary" as any}
            color={"whiteFog"}
            onClick={onJustKeepMeInTheLoop}
          >
            Just keep me in the loop
          </Button>,
        ];
      case State.KEEP_ME_IN_THE_LOOP:
        return (
          <KeepMeInTheLoopComponentDefault onSubmit={onKeepMeInTheLoopSignUp} />
        );
      case State.EMAIL_SUBMITTED:
        return (
          <Stack>
            <Typography variant="subtitle2">
              We'll keep you in the loop
            </Typography>
            <Image src={WomanPanelsSVG}></Image>
          </Stack>
        );
    }
  };

  return (
    <Component shadow background standardWidth={false} sx={{ width: "100%" }}>
      <Typography variant={"smallHeadline" as any}>{title(state)}</Typography>

      <Divider />

      {content(state)}
    </Component>
  );
};

export const DefaultReservePanelComponent = () => {
  const {
    loading,
    currentPanels,
    setCurrentPanels,
    costPerPanel,
    currentReservedPanels,
    maxPanelReservations,
    confirmPanels,
    onKeepMeInTheLoop,
  } = useReservations();

  const [state, setState] = useState(State.DEFAULT);

  return (
    <ReservePanelComponent
      confirmPanels={confirmPanels}
      currentPanels={currentPanels}
      setCurrentPanels={setCurrentPanels}
      costPerPanel={costPerPanel ? costPerPanel : 250}
      onJustKeepMeInTheLoop={() => setState(State.KEEP_ME_IN_THE_LOOP)}
      onKeepMeInTheLoopSignUp={async (values) => {
        await onKeepMeInTheLoop(values);
        setState(State.EMAIL_SUBMITTED);
      }}
      state={state}
    />
  );
};
