import { Typography, Box, Stack, Button, Link } from "@mui/material";
import { EnvelopeIcon } from "../icons/emoji_icons";
import { GoogleIcon } from "../icons/icons";
import { IconButton } from "../buttons/icon_button";
import { ContentDivider } from "../basics/content_divider";
import PropTypes from "prop-types";
import { Divider } from "../basics/divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

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
      variant="primary"
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

    {/* <IconButton
            variant="small"
            label="Sign up with email"
            color="legendaryGreen"
            icon={<EnvelopeIcon></EnvelopeIcon>}
            onClick={onSignUpWithEmail}
        ></IconButton> */}

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
  </Stack>
);

SignUpOptionComponent.propTypes = {
  onSignUpWithGoogle: PropTypes.func.isRequired,
  onSignUpWithEmail: PropTypes.func.isRequired,
  onNavigateToSignIn: PropTypes.func.isRequired,
};
