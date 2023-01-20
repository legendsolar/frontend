import { Typography, Box, Stack, Button, Link } from "@mui/material";

import { DualPaneView } from "@project/components/views/dual_pane_view";
import {
  SignInComponent,
  SignInComponentDefault,
  Values,
} from "@project/components/inputs/sign_in_component";
import { Image } from "../utils/image";
import WomanPanelsSVG from "@project/components/assets/images/women_panel.svg";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "../buttons/icon_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentDivider } from "../basics/content_divider";

interface SignInPageProps {
  onLogInWithEmailPassword(values: Values): Promise<void>;
  onLogInWithGoogle(): void;
  onCreateNewAccount(): void;
  onLegacySignIn(): void;
  onForgotPassword(): void;
}

export const SignInPage = ({
  onLogInWithEmailPassword,
  onLogInWithGoogle,
  onCreateNewAccount,
  onForgotPassword,
  onLegacySignIn,
}: SignInPageProps) => {
  return (
    <DualPaneView
      leftPane={
        <Stack spacing={"32px"} sx={{ maxWidth: "500px", width: "500px" }}>
          <Typography variant="smallHeadline">Login</Typography>
          <IconButton
            variant="signup"
            label="Login with Google"
            color="legendaryGreen"
            iconJustify="flex-start"
            icon={<FontAwesomeIcon icon={faGoogle} />}
            onClick={onLogInWithGoogle}
          ></IconButton>

          <ContentDivider color={"white"}>
            <Typography variant="label" color={"blackDawn.main"}>
              or login with email
            </Typography>
          </ContentDivider>
          <SignInComponentDefault
            onSubmit={onLogInWithEmailPassword}
            onForgotPassword={onForgotPassword}
            color="light"
          />

          <Stack direction="row" justifyContent={"center"} spacing={0}>
            <Typography variant="subtitle3" color={"blackDawn.main"}>
              {"Don't have an account?"}
            </Typography>
            <Button onClick={onCreateNewAccount}>
              <Typography
                variant="subtitle3"
                color="legendaryGreen.main"
                sx={{ ml: 1 }}
              >
                {"Reserve panels to sign up"}
              </Typography>
            </Button>
          </Stack>

          <Stack direction="row" justifyContent={"center"} spacing={0}>
            <Typography variant="subtitle2" color={"blackDawn.main"}>
              {"Reserve panels before January 13, 2023?"}
            </Typography>
            <Typography
              variant="subtitle2"
              color="legendaryGreen.main"
              sx={{ ml: 1 }}
              onClick={onLegacySignIn}
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
