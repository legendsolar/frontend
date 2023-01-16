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
  header?: JSX.Element | undefined;
  drawerPosition?: "left" | "right" | "top" | "bottom" | "none";
  constrainedDrawerPostion?: "left" | "right" | "top" | "bottom" | "none";
  constrainedBreakpoint?: Breakpoint;
  drawerGridSize?: number;
}

const SideBarView = ({
  drawer = <></>,
  mainContent = <></>,
  header = undefined,
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
            <Box
              sx={{
                height: "max-content",
                top: "20px",
                position: "sticky",
              }}
            >
              <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
            </Box>
          );
        case "top":
          return (
            <Box
              sx={{
                width: "100%",
                pl: 0,
                pr: 0,
                mb: {
                  md: 4,
                },
              }}
            >
              <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
            </Box>
          );

        case "right":
          return (
            <Box
              sx={{
                height: "max-content",
                top: "20px",
                position: "sticky",
              }}
            >
              <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
            </Box>
          );

        case "bottom":
          return (
            <Box
              sx={{
                width: "100%",
                pl: 0,
                pr: 0,
                mb: {
                  md: 4,
                },
              }}
            >
              <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
            </Box>
          );
      }

    return null;
  };

  const renderHeader = () => {
    if (header) {
      return (
        <DefaultErrorBoundary>
          <Box sx={{ mb: 4 }}> {header}</Box>
        </DefaultErrorBoundary>
      );
    }
  };

  return (
    <div>
      <Stack>
        {getDrawerPosition("top")}
        <Stack direction={"row"} spacing={8}>
          {getDrawerPosition("left")}
          {renderHeader()}

          {mainContent}

          {getDrawerPosition("right")}
        </Stack>
        {getDrawerPosition("bottom")}
      </Stack>
    </div>
  );
};

export default SideBarView;
