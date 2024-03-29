import { Container, Grid, Box, Stack, Typography } from "@mui/material";
import { BackButton } from "../buttons/back_button";
import {
  SignUpProcessItem,
  SignUpProcessBarComponent,
} from "../signup/sign_up_process_bar_component";
import DualPaneView from "./dual_pane_view";

interface VerifyProcessViewProps {
  leftContent: JSX.Element;
  processItems: Array<SignUpProcessItem>;
  onBackAction(): any;
}

const VerifyProcessView = ({
  leftContent,
  processItems,
  onBackAction,
}: VerifyProcessViewProps) => {
  return (
    <DualPaneView
      leftPane={
        <Stack height={"100%"} justifyContent="space-between">
          <Stack height={"100%"} justifyContent="center">
            {leftContent}
          </Stack>

          <SignUpProcessBarComponent
            processItems={processItems}
            sx={{ mb: 4 }}
          ></SignUpProcessBarComponent>
        </Stack>
      }
      rightPane={<div></div>}
      upperLeftCorner={
        <BackButton label={"Back to steps"} onClick={onBackAction}></BackButton>
      }
    ></DualPaneView>
  );
};

export default VerifyProcessView;
