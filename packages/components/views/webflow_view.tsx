import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import { Footer } from "../footer";
import WebflowNavBar from "../nav/webflow_nav_bar";
import { MainContentBox } from "../basics";

export const WebflowView = ({ children }) => {
  return (
    <MainContentBox sx={{ backgroundColor: "whiteFog.main" }}>
      <WebflowNavBar />
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
