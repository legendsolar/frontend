import { Typography, Box, Stack, Button, Link } from "@mui/material";

import { DualPaneView } from "@project/components/views/dual_pane_view";
import { SignInComponent } from "@project/components/inputs/sign_in_component";
import { Image } from "../utils/image";
import WomanPanelsSVG from "@project/components/assets/images/women_panel.svg";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "../buttons/icon_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentDivider } from "../basics/content_divider";

export const SignInPage = () => {
  return (
    <DualPaneView
      leftPane={
        <Stack spacing={"32px"}>
          <Typography variant="smallHeadline">Login</Typography>
          <IconButton
            variant="primary"
            label="Login with Google"
            color="legendaryGreen"
            icon={<FontAwesomeIcon icon={faGoogle} />}
            onClick={() => {}}
          ></IconButton>

          <ContentDivider color={"white"}>
            <Typography variant="label" color={"blackDawn.main"}>
              or login with email
            </Typography>
          </ContentDivider>
          <SignInComponent color="light"></SignInComponent>

          <Stack direction="row" justifyContent={"center"} spacing={0}>
            <Typography variant="subtitle3" color={"blackDawn.main"}>
              {"Don't have an account?"}
            </Typography>
            <Typography
              variant="subtitle3"
              color="legendaryGreen.main"
              sx={{ ml: 1 }}
            >
              {"Reserve panels to sign up"}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent={"center"} spacing={0}>
            <Typography variant="subtitle2" color={"blackDawn.main"}>
              {"Reserve panels before January 13, 2023?"}
            </Typography>
            <Typography
              variant="subtitle2"
              color="legendaryGreen.main"
              sx={{ ml: 1 }}
            >
              {"Legacy sign in"}
            </Typography>
          </Stack>
        </Stack>
      }
      rightPane={<Image src={WomanPanelsSVG}></Image>}
    ></DualPaneView>
  );
};
