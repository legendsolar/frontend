import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import { Footer } from "../footer";
import WebflowNavBar, {
  States,
  WebflowNavBarProps,
} from "../nav/webflow_nav_bar";
import { MainContentBox } from "../basics";
import { ReactElement } from "react";
import { EXTERNAL_LINKS, redirect } from "@p/utils/webflow/webflowLinking";
import { red } from "@mui/material/colors";

export const WebflowView = ({
  children,
  state,
  onLogout,
  onLogin,
  onGetEarlyAccess,
  onCheckStatus,
}: {
  children: ReactElement;
  state: States;
  onLogout(): void;
  onLogin(): void;
  onGetEarlyAccess(): void;
  onCheckStatus(): void;
}) => {
  const navProps: WebflowNavBarProps = {
    state,
    onToHomepage: () => redirect(EXTERNAL_LINKS.HOME),
    onAboutUs: () => redirect(EXTERNAL_LINKS.PAGES.ABOUT_US),
    onFAQs: () => redirect(EXTERNAL_LINKS.PAGES.FAQS),
    onHowItWorks: () => redirect(EXTERNAL_LINKS.PAGES.HOW_IT_WORKS),
    onTheTeam: () => redirect(EXTERNAL_LINKS.PAGES.TEAM),
    onLogout,
    onLogin,
    onGetEarlyAccess,
    onCheckStatus,
  };

  return (
    <MainContentBox>
      <WebflowNavBar {...navProps} />
      <Box
        sx={{
          pl: {
            sm: "0px",
            md: "10px",
            lg: "20px",
            xl: "20px",
          },
          pr: {
            sm: "0px",
            md: "10px",
            lg: "20px",
            xl: "20px",
          },
        }}
      >
        <Box
          sx={{
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>

        <Footer></Footer>
      </Box>
    </MainContentBox>
  );
};

export default WebflowView;
