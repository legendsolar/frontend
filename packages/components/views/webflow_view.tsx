import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import { Footer } from "../footer";
import WebflowNavBar, {
  States,
  WebflowNavBarDefault,
  WebflowNavBarProps,
} from "../nav/webflow_nav_bar";
import { MainContentBox } from "../basics";
import { ReactElement } from "react";
import { EXTERNAL_LINKS, redirect } from "@p/utils/webflow/webflowLinking";
import { red } from "@mui/material/colors";

export const WebflowView = ({ children }: { children: ReactElement }) => {
  return (
    <Box>
      <WebflowNavBarDefault />
      <MainContentBox>
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
    </Box>
  );
};

export default WebflowView;
