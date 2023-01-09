import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import { Footer } from "../footer";
import WebflowNavBar from "../nav/webflow_nav_bar";
import { MainContentBox } from "../basics";

export const WebflowView = ({ children }) => {
  return (
    <Box width="100%" height="100%">
      <WebflowNavBar />

      <MainContentBox>
        <Box
          sx={{
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>

        <Footer></Footer>
      </MainContentBox>
    </Box>
  );
};

export default WebflowView;
