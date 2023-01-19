import { Grid, Typography, Box, Stack, Button } from "@mui/material";
import { EXTERNAL_LINKS } from "@p/utils/webflow/webflowLinking";

export const Footer = () => {
  return (
    <Box sx={{ mt: "80px" }}>
      <Grid container spacing={4} rowSpacing={11}>
        <Grid item xs={12} lg={8} order={{ md: 2, lg: 1 }}>
          <Stack>
            <Grid container rowSpacing={11}>
              <Grid item xs={12} md={6} lg={3}>
                <Stack>
                  <Typography variant={"smallHeadline" as any}>
                    Company
                  </Typography>

                  <Button href={EXTERNAL_LINKS.HOME} variant="text">
                    <Typography variant="body2" color={"blackDawn.main"}>
                      Home
                    </Typography>
                  </Button>

                  <Button href={EXTERNAL_LINKS.PAGES.ABOUT_US} variant="text">
                    <Typography variant="body2" color={"blackDawn.main"}>
                      About us
                    </Typography>
                  </Button>

                  <Button href={EXTERNAL_LINKS.PAGES.TEAM} variant="text">
                    <Typography variant="body2" color={"blackDawn.main"}>
                      The team
                    </Typography>
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Stack>
                  <Typography variant={"smallHeadline" as any}>
                    Learn
                  </Typography>

                  <Button
                    href={EXTERNAL_LINKS.PAGES.HOW_IT_WORKS}
                    variant="text"
                  >
                    <Typography variant="body2" color={"blackDawn.main"}>
                      How it works
                    </Typography>
                  </Button>

                  <Button href={EXTERNAL_LINKS.PAGES.FAQS} variant="text">
                    <Typography variant="body2" color={"blackDawn.main"}>
                      FAQs
                    </Typography>
                  </Button>

                  <Button href={EXTERNAL_LINKS.PAGES.NEWS_ROOM} variant="text">
                    <Typography variant="body2" color={"blackDawn.main"}>
                      News Room
                    </Typography>
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Stack>
                  <Typography variant={"smallHeadline" as any}>
                    Connect
                  </Typography>

                  <Button href={EXTERNAL_LINKS.CONNECT.TWITTER} variant="text">
                    <Typography variant="body2" color={"blackDawn.main"}>
                      Twitter
                    </Typography>
                  </Button>

                  <Button
                    href={EXTERNAL_LINKS.CONNECT.INSTAGRAM}
                    variant="text"
                  >
                    <Typography variant="body2" color={"blackDawn.main"}>
                      Instagram
                    </Typography>
                  </Button>

                  <Button
                    href={EXTERNAL_LINKS.CONNECT.LINKED_IN}
                    variant="text"
                  >
                    <Typography variant="body2" color={"blackDawn.main"}>
                      LinkedIn
                    </Typography>
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Stack>
                  <Typography variant={"smallHeadline" as any}>
                    Legal
                  </Typography>

                  <Button
                    href={EXTERNAL_LINKS.LEGAL.PRIVACY_POLICY}
                    variant="text"
                  >
                    <Typography variant="body2" color={"blackDawn.main"}>
                      Privacy Policy
                    </Typography>
                  </Button>

                  <Button
                    href={EXTERNAL_LINKS.LEGAL.TERMS_AND_CONDITIONS}
                    variant="text"
                  >
                    <Typography variant="body2" color={"blackDawn.main"}>
                      {"Terms & Conditions"}
                    </Typography>
                  </Button>

                  <Button href={EXTERNAL_LINKS.LEGAL.DISCLAIMER} variant="text">
                    <Typography variant="body2" color={"blackDawn.main"}>
                      Disclaimer
                    </Typography>
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4} order={{ md: 1, lg: 2 }}>
          <Stack spacing={4}>
            <Stack>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "300",
                  lineHeight: "38px",
                }}
              >
                Designed by Legends
              </Typography>

              <Typography variant={"body1" as any}>
                in Brooklyn, New York
              </Typography>
            </Stack>

            <Stack>
              <Typography variant={"body1" as any}>
                Legends Incorporated
              </Typography>
              <Typography variant={"uppercaseDescription" as any}>
                134 North 4th Street
              </Typography>

              <Typography variant={"uppercaseDescription" as any}>
                Brooklyn, NY 11249
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <div style={{ height: "40px" }}></div>

      <Typography variant="smallHeadline">Disclaimer</Typography>
      <div style={{ height: "20px" }}></div>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={4}>
          <Typography variant="label">
            {`No offers to sell or solicitations of an offer to buy securities or
            any other type of investment are being made or solicited by Legends
            Incorporated at this time. No money or other consideration is being
            solicited, and if sent in response, will not be accepted. We
            anticipate that our initial offering will be conducted as a private
            placement available only to accredited investors. From time to time,
            we may seek to qualify additional offerings of securities under
            Regulation A, promulgated under the Securities Act of 1933, as
            amended (“Regulation A”). No offer to buy securities can be accepted
            and no part of any purchase price can be received, and any such
            offer to buy may be withdrawn or revoked, without obligation or
            commitment of any kind, at any time before notice of its acceptance
            in compliance with applicable securities laws and, with respect to
            any offering under Regulation A, until an offering statement filed
            with the Securities and Exchange Commission (the "SEC") relating to
            that series has been qualified by the SEC. `}
          </Typography>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Typography variant="label">
            {`Any indication of interest that you may provide (including by submitting an email address at which you can be contacted or receive further information) involves no obligation or commitment of any kind.
Legends Incorporated is not a registered broker-dealer, investment adviser, or crowdfunding portal and does not engage in any activities requiring any such registration. The information contained on this website is provided for informational and discussion purposes only and is not intended to be a recommendation to invest in, or purchase, sell, or hold, any securities, or to engage in any type of transaction. Any such offers will only be made pursuant to formal offering materials containing full details regarding risks, investment terms, and fees.
Please consult with your legal and financial advisors before investing and do not invest unless you are able to sustain the risk of loss of your entire investment. Past performance is no guarantee of future results. Any historical returns, expected returns, or probability projections are forward looking statements and may not reflect actual future performance. All investments involve risk and may result in loss.
`}
          </Typography>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Typography variant="label">
            {`This website contains forward-looking statements that are based on our beliefs and assumptions and on information currently available to us. In some cases, you can identify forward-looking statements by the following words: "estimated," “will,” “expect,” “would,” “intend,” “believe,” or other comparable terminology.
Forward-looking statements in this website include, but are not limited to, statements about our business plan, potential investments in renewable energy projects, our market opportunities and beliefs, and our objectives for future operations. These statements involve risks, uncertainties, assumptions and other factors that may cause actual results or performance to be materially different. We cannot assure you that the forward-looking statements will prove to be accurate. These forward-looking statements speak only as of the date hereof. We disclaim any obligation to update these forward-looking statements. `}
          </Typography>
        </Grid>
      </Grid>

      <div style={{ height: "100px" }}></div>

      <Typography variant="label" sx={{ fontWeight: "700" }}>
        {`© 2022 Legends Incorporated. All rights reserved.`}
      </Typography>

      <div style={{ height: "100px" }}></div>
    </Box>
  );
};
