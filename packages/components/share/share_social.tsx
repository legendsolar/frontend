import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Button } from "@mui/material";
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

export const ShareSocial = ({ shareUrl }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={3} xs={12}>
          <IconButton
            target={"_blank"}
            variant={"multiselect"}
            href={getFacebookShareUrl(getUrlWithMessage(shareUrl))}
            label={"Facebook"}
            icon={<FontAwesomeIcon icon={faFacebook} />}
          />
        </Grid>

        <Grid item lg={3} xs={12}>
          <IconButton
            variant={"multiselect"}
            target={"_blank"}
            href={getTwitterShareUrl(getUrlWithMessage(shareUrl))}
            label={"Twitter"}
            icon={<FontAwesomeIcon icon={faTwitter} />}
          />
        </Grid>

        <Grid item lg={3} xs={12}>
          <IconButton
            variant={"multiselect"}
            target={"_blank"}
            href={getLinkedInShareUrl(getUrlWithMessage(shareUrl))}
            label={"LinkedIn"}
            icon={<FontAwesomeIcon icon={faLinkedinIn} />}
          />
        </Grid>

        <Grid item lg={3} xs={12}>
          <IconButton
            target={"_blank"}
            variant={"multiselect"}
            href={getEmailShareUrl(getUrlWithMessage(shareUrl))}
            label={"Email"}
            icon={<FontAwesomeIcon icon={faEnvelope} />}
          />
        </Grid>
      </Grid>
    </div>
  );
};
