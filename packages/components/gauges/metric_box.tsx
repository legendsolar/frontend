import { Component } from "../basics";
import { Stack, Typography } from "@mui/material";
import { typographyOptions } from "../theme";

export const MetricBox = ({ metric, title, icon }) => {
  return (
    <Component
      standardWidth={false}
      sx={{
        backgroundColor: "none",
        width: "100%",
      }}
    >
      <Stack spacing={1}>
        {icon}
        <Typography
          variant={"headline1" as any}
          sx={{
            fontSize: {
              md: 25,
              lg: 32,
            },
            fontWeight: "700",
          }}
        >
          {metric}
        </Typography>
        <Typography
          variant={"monoButton" as any}
          sx={{
            textTransform: "uppercase",
            fontSize: "12px",
          }}
        >
          {title}
        </Typography>
      </Stack>
    </Component>
  );
};
