import { DualPaneView } from "@project/components/views/dual_pane_view";
import { SignUpOptionComponent } from "@project/components/signup/sign_up_option_component";
import { PanelDisplay } from "@project/components/panels/panel_display";
import { getLocalStorePanelsReserved } from "utility/use_reservations";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import { useRouter } from "next/router";

export default () => {
  const { signInWithGoogle } = useAuthProviders();
  const router = useRouter();

  return (
    <DualPaneView
      leftPane={
        <SignUpOptionComponent
          onSignUpWithGoogle={signInWithGoogle}
          onNavigateToSignIn={() => {
            router.push("./sign_in");
          }}
        ></SignUpOptionComponent>
      }
      rightPane={
        <div></div>
        // <PanelDisplay
        //   panelRows={3}
        //   panelWidth={10}
        //   hidePanels={false}
        //   currentPanelSelectedCount={getLocalStorePanelsReserved()}
        //   onPanelCountUpdate={() => {}}
        // ></PanelDisplay>
      }
    ></DualPaneView>
  );
};
