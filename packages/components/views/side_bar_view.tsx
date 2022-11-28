import {
  Container,
  Grid,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  Breakpoint,
} from "@mui/material";
import DefaultView from "./default_view";
import { ErrorBoundary } from "@sentry/react";
import { DefaultErrorBoundary } from "../errors/default_error_boundary";

interface SideBarViewProps {
  drawer?: JSX.Element;
  mainContent?: JSX.Element;
  header?: JSX.Element;
  drawerPosition?: "left" | "right" | "top" | "bottom" | "none";
  constrainedDrawerPostion?: "left" | "right" | "top" | "bottom" | "none";
  constrainedBreakpoint?: Breakpoint;
  drawerGridSize?: number;
}

const SideBarView = ({
  drawer = <></>,
  mainContent = <></>,
  header = <></>,
  drawerPosition = "left",
  constrainedDrawerPostion = "top",
  constrainedBreakpoint = "xl",
  drawerGridSize = 4,
}: SideBarViewProps) => {
  const theme = useTheme();
  const constrained = useMediaQuery(
    theme.breakpoints.down(constrainedBreakpoint)
  );

  const currentDisplayPosition = () => {
    if (constrained) {
      return constrainedDrawerPostion;
    }

    return drawerPosition;
  };

  const getDrawerPosition = (position: string) => {
    if (position === currentDisplayPosition())
      switch (drawerPosition) {
        case "left":
          return (
            <Grid item xl={drawerGridSize} xs={12}>
              <Box
                sx={{
                  height: "max-content",
                  top: "20px",
                  position: "sticky",
                  width: "100%",
                }}
              >
                <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
              </Box>
            </Grid>
          );
        case "top":
          return (
            <Box
              sx={{
                width: "100%",
                pl: 0,
                pr: 0,
                mb: {
                  sm: 4,
                  md: 0,
                },
              }}
            >
              <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
            </Box>
          );

        case "right":
          return (
            <Grid item xl={drawerGridSize} xs={12}>
              <Box
                sx={{
                  height: "max-content",
                  top: "20px",
                  position: "sticky",
                  width: "100%",
                }}
              >
                <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
              </Box>
            </Grid>
          );

        case "bottom":
          return (
            <Box
              sx={{
                width: "100%",
                pl: 0,
                pr: 0,
                mb: {
                  sm: 4,
                  md: 0,
                },
              }}
            >
              <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
            </Box>
          );
      }

    return null;
  };

  return (
    <div>
      <Grid container columnSpacing={4}>
        {getDrawerPosition("left")}
        <Grid item xl={12 - drawerGridSize} xs={12}>
          <Stack
            sx={{
              width: "100%",
            }}
          >
            <Box>
              {getDrawerPosition("top")}

              {!!header && (
                <DefaultErrorBoundary>
                  <Box sx={{ mb: 4 }}> {header}</Box>
                </DefaultErrorBoundary>
              )}

              <DefaultErrorBoundary>
                <Box sx={{ mt: { xs: 4, md: 0 } }}>{mainContent}</Box>
              </DefaultErrorBoundary>

              {getDrawerPosition("bottom")}
            </Box>
          </Stack>
        </Grid>

        {getDrawerPosition("right")}
      </Grid>
    </div>
  );
};

export default SideBarView;
