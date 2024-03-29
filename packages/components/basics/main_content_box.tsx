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
  sx = {},
}: {
  children: JSX.Element;
  passedRef: MutableRefObject<HTMLElement | undefined>;
  sx?: any;
}) => (
  <Box
    sx={{
      maxWidth: {
        lg: "1250px", // about
      },
      minWidth: {
        lg: "971px",
      },

      width: "100%",
      height: "100%",

      // TODO this breaks the sticky sidebar
      //   overflowX: {
      //     lg: "scroll",
      //     md: "hidden",
      //   },
      mr: "auto",
      ml: "auto",
      ...sx,
    }}
  >
    <div id="MainContentBox" ref={passedRef}>
      {children}
    </div>
  </Box>
);
