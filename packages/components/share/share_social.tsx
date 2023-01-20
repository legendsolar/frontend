import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Button, Stack, Typography } from "@mui/material";
import {
  getEmailShareUrl,
  getFacebookShareUrl,
  getLinkedInShareUrl,
  getTwitterShareUrl,
  getUrlWithMessage,
} from "@p/utils/share";
import {
  faFacebook,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "../buttons/icon_button";

import { faCalendarDays, faEnvelope } from "@fortawesome/pro-solid-svg-icons";
import { ContentDivider } from "../basics";

export const ShareSocial = ({ shareUrl }) => {
  return (
    <Stack spacing={3}>
      <ContentDivider>
        <Typography variant={"monoButton" as any}>Share Via Social</Typography>
      </ContentDivider>
      <IconButton
        target={"_blank"}
        variant={"multiselect"}
        href={getFacebookShareUrl(getUrlWithMessage(shareUrl))}
        label={"Facebook"}
        icon={<FontAwesomeIcon icon={faFacebook} />}
      />
      <IconButton
        variant={"multiselect"}
        target={"_blank"}
        href={getTwitterShareUrl(getUrlWithMessage(shareUrl))}
        label={"Twitter"}
        icon={<FontAwesomeIcon icon={faTwitter} />}
      />
      <IconButton
        variant={"multiselect"}
        target={"_blank"}
        href={getLinkedInShareUrl(getUrlWithMessage(shareUrl))}
        label={"LinkedIn"}
        icon={<FontAwesomeIcon icon={faLinkedinIn} />}
      />
      <IconButton
        target={"_blank"}
        variant={"multiselect"}
        href={getEmailShareUrl(getUrlWithMessage(shareUrl))}
        label={"Email"}
        icon={<FontAwesomeIcon icon={faEnvelope} />}
      />
    </Stack>
  );
};
