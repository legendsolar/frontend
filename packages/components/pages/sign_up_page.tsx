import { DualPaneView } from "@project/components/views/dual_pane_view";
import { SignUpOptionComponent } from "../signup/sign_up_option_component";
import { PanelDisplay } from "@project/components/panels/panel_display";
import { Box, Stack, Typography } from "@mui/material";

export const SignUpPage = ({
  signInWithGoogle,
  onNavigateToSignIn,
  onSignUpWithEmail,
}) => {
  return (
    <DualPaneView
      leftPane={
        <Stack sx={{ maxWidth: "500px", width: "500px" }} spacing={10}>
          <Typography
            variant="headline2"
            sx={{ display: { md: "inline", lg: "none" } }}
          >
            <Typography variant="headline2" color={"legendaryGreen.main"}>
              {4} panels{" "}
            </Typography>
            selected{" "}
          </Typography>

          <SignUpOptionComponent
            onSignUpWithGoogle={signInWithGoogle}
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
              {4} panels{" "}
            </Typography>
            selected{" "}
          </Typography>
          <PanelDisplay
            panelRows={3}
            panelWidth={10}
            hidePanels={false}
            currentPanelSelectedCount={4}
            onPanelCountUpdate={() => {}}
            interaction={false}
          ></PanelDisplay>
        </Stack>
      }
    ></DualPaneView>
  );
};
