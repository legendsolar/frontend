import { DualPaneView } from "@project/components/views/dual_pane_view";
import { SignUpOptionComponent } from "../signup/sign_up_option_component";
import { PanelDisplay } from "@project/components/panels/panel_display";
import { Box } from "@mui/material";

export const SignUpPage = ({ signInWithGoogle, onNavigateToSignIn }) => {
  return (
    <DualPaneView
      leftPane={
        <Box sx={{ maxWidth: "500px" }}>
          <SignUpOptionComponent
            onSignUpWithGoogle={signInWithGoogle}
            onNavigateToSignIn={onNavigateToSignIn}
          ></SignUpOptionComponent>
        </Box>
      }
      rightPane={
        <PanelDisplay
          panelRows={3}
          panelWidth={10}
          hidePanels={false}
          currentPanelSelectedCount={4}
          onPanelCountUpdate={() => {}}
        ></PanelDisplay>
      }
    ></DualPaneView>
  );
};
