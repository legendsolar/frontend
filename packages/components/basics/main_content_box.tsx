import { Box } from "@mui/material";
import React, { MutableRefObject } from "react";
import { breakpoints } from "../theme";

export const fromViewportPadding = () => {
  return {
    md: `calc((100vw - ${breakpoints.values.md}px) / 2)`,
    lg: `calc((100vw - ${breakpoints.values.lg}px) / 2)`,
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
        lg: "1250px", // about
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
