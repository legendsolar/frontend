import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import { Footer } from "../footer";
import WebflowNavBar from "../nav/webflow_nav_bar";

export const WebflowView = ({ children }) => {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        transform: "translate3d(0, 0, 0)",
        pl: "30px",
      }}
    >
      <WebflowNavBar />

      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>

      <Footer></Footer>
    </Box>
  );
};

export default WebflowView;
