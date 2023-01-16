import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import { Footer } from "../footer";
import WebflowNavBar from "../nav/webflow_nav_bar";
import { MainContentBox } from "../basics";

export const WebflowView = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: "whiteHaze.main", overscrollBehavior: "none" }}>
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
