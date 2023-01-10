import { DualPaneView } from "@project/components/views/dual_pane_view";
import { SignUpOptionComponent } from "@project/components/signup/sign_up_option_component";
import { PanelDisplay } from "@project/components/panels/panel_display";
import { getLocalStorePanelsReserved } from "utility/use_reservations";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import { SignInComponent } from "@project/components/inputs/sign_in_component";

export default () => {
  const { signInWithGoogle } = useAuthProviders();

  return (
    <DualPaneView
      leftPane={<SignInComponent></SignInComponent>}
      rightPane={<></>}
    ></DualPaneView>
  );
};
