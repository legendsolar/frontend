import { DualPaneView } from "@project/components/views/dual_pane_view";
import { SignUpOptionComponent } from "../signup/sign_up_option_component";
import { PanelDisplay } from "@project/components/panels/panel_display";
import { Box, Stack, Typography } from "@mui/material";
import { Values } from "../signup/user_information_component";
import Head from "next/head";

export interface SignUpPageProps {
  onSignUpWithGoogle: () => void;
  onSignUpWithEmail: (values: Values) => Promise<void>;
  onNavigateToSignIn: () => void;
  panelsSelected: number;
}

export const SignUpPage = ({
  onSignUpWithGoogle,
  onNavigateToSignIn,
  onSignUpWithEmail,
  panelsSelected,
}: SignUpPageProps) => {
  return (
    <DualPaneView
      leftPane={
        <Stack sx={{ maxWidth: "500px", width: "500px" }} spacing={10}>
          <Typography
            variant="headline2"
            sx={{ display: { md: "inline", lg: "none" } }}
          >
            <Typography variant="headline2" color={"legendaryGreen.main"}>
              {panelsSelected} panels{" "}
            </Typography>
            selected{" "}
          </Typography>

          <SignUpOptionComponent
            onSignUpWithGoogle={onSignUpWithGoogle}
            onSignUpWithEmail={onSignUpWithEmail}
            onNavigateToSignIn={onNavigateToSignIn}
          ></SignUpOptionComponent>
        </Stack>
      }
      rightPane={
        <Stack alignItems={"center"} spacing={8}>
          <Typography
            variant="headline2"
            sx={{ display: { md: "none", lg: "inline" } }}
          >
            <Typography variant="headline2" color={"legendaryGreen.main"}>
              {panelsSelected} panels{" "}
            </Typography>
            selected{" "}
          </Typography>
          <PanelDisplay
            panelRows={3}
            panelWidth={10}
            hidePanels={false}
            currentPanelSelectedCount={panelsSelected}
            onPanelCountUpdate={() => {}}
            interaction={false}
          ></PanelDisplay>
        </Stack>
      }
    ></DualPaneView>
  );
};
