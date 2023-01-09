import { Box } from "@mui/material";
import React, { MutableRefObject } from "react";
import { breakpoints } from "../theme";

export const fromViewportPadding = () => {
  return {
    xs: `calc((100vw - ${breakpoints.values.xs}px-20px) / 2)`,
    sm: `calc((100vw - ${breakpoints.values.sm}px-20px) / 2)`,
    md: `calc((100vw - ${breakpoints.values.md}px) / 2)`,
    lg: `calc((100vw - ${breakpoints.values.lg}px) / 2)`,
    xl: `calc((100vw - ${breakpoints.values.xl}px) / 2)`,
  };
};

export const MainContentBox = ({
  children,
  passedRef,
}: {
  children: JSX.Element;
  passedRef: MutableRefObject<HTMLElement | undefined>;
}) => (
  <Box
    sx={{
      maxWidth: {
        md: breakpoints.values.md + "px",
        lg: breakpoints.values.lg + "px", // about
        xl: breakpoints.values.xl + "px",
      },
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
      mr: "auto",
      ml: "auto",
    }}
  >
    <div
      id="MainContentBox"
      ref={passedRef}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </div>
  </Box>
);
