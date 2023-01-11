import { Typography, Box, Stack, Button, Link } from "@mui/material";
import { EnvelopeIcon } from "../icons/emoji_icons";
import { GoogleIcon } from "../icons/icons";
import { IconButton } from "../buttons/icon_button";
import { ContentDivider } from "../basics/content_divider";
import PropTypes from "prop-types";
import { Divider } from "../basics/divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { UserInformationComponent } from "./user_information_component";

export const SignUpOptionComponent = ({
  onSignUpWithGoogle,
  onSignUpWithEmail,
  onNavigateToSignIn,
}) => (
  <Stack spacing={4}>
    <Typography variant="smallHeadline" sx={{ mb: 6 }}>
      Create Account to Reserve Panels
    </Typography>

    <IconButton
      variant="signup"
      label="Sign up with Google"
      color="legendaryGreen"
      icon={<FontAwesomeIcon icon={faGoogle} />}
      onClick={onSignUpWithGoogle}
    ></IconButton>

    <ContentDivider color={"white"}>
      <Typography variant="label" color={"blackDawn.main"}>
        or sign up with email
      </Typography>
    </ContentDivider>

    <UserInformationComponent color="light"></UserInformationComponent>

    <Stack direction="row" justifyContent={"center"} spacing={0}>
      <Typography variant="subtitle3" color={"blackDawn.main"}>
        {"Already have an account?"}
      </Typography>
      <Typography
        variant="subtitle3"
        color="legendaryGreen.main"
        sx={{ ml: 1 }}
        onClick={onNavigateToSignIn}
      >
        {"Login"}
      </Typography>
    </Stack>

    <Stack direction="row" justifyContent={"center"} spacing={0}>
      <Typography variant={"subtitle3" as any}>
        {"Signing up for an account means you agree to our "}
        <Typography
          variant={"link" as any}
          component={Link}
          target={"_blank"}
          href={"https://www.legends.solar/legal/privacy-policy"}
          // onClick={onNavigateToPrivacyPolicy}
        >
          privacy policy
        </Typography>{" "}
        and{" "}
        <Typography
          variant={"link" as any}
          component={Link}
          target={"_blank"}
          href={"https://www.legends.solar/legal/terms-and-conditions"}
        >
          terms of service
        </Typography>
      </Typography>
    </Stack>
  </Stack>
);

SignUpOptionComponent.propTypes = {
  onSignUpWithGoogle: PropTypes.func.isRequired,
  onSignUpWithEmail: PropTypes.func.isRequired,
  onNavigateToSignIn: PropTypes.func.isRequired,
};
