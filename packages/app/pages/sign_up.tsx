import { DualPaneView } from "@project/components/views/dual_pane_view";
import { SignUpOptionComponent } from "@project/components/signup/sign_up_option_component";

export default () => {
  return (
    <DualPaneView
      leftPane={<SignUpOptionComponent></SignUpOptionComponent>}
      rightPane={<div>right</div>}
    ></DualPaneView>
  );
};
