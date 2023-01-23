import {
  ForgotPasswordComponent,
  ForgotPasswordComponentDefault,
  Values,
} from "../inputs/forgot_password_component";
import WomanPanelsSVG from "@project/components/assets/images/women_panel.svg";
import DualPaneView from "../views/dual_pane_view";
import { Image } from "../utils/image";
import { Stack } from "@mui/material";

export const ForgotPasswordPage = () => {
  return (
    <DualPaneView
      leftPane={
        <Stack spacing={"32px"} sx={{ maxWidth: "500px", width: "500px" }}>
          <ForgotPasswordComponentDefault color="light" />
        </Stack>
      }
      rightPane={<Image src={WomanPanelsSVG}></Image>}
    />
  );
};
