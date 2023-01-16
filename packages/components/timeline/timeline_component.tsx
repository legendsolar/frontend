import { Stack, Typography, Box, Grid } from "@mui/material";
import { ComponentDivider } from "../basics/component_divider";
import { Divider } from "../basics/divider";
import { legendaryGreen } from "../static/colors";

export interface TimelineStep {
  title: string;
  description: string;
  linkBubble?: JSX.Element;
}

export interface TimelineComponentProps {
  steps: Array<TimelineStep>;
  sx?: any;
}

export const TimelineComponent = ({
  steps,
  sx = {},
}: TimelineComponentProps) => {
  return (
    <Box
      style={{
        backgroundColor: "#FFF",
      }}
      sx={{
        position: "relative",
        p: 0,
        borderRadius: "5px",
        ...sx,
      }}
    >
      {steps.map((step, idx) => (
        <Grid container>
          <Grid item xs={2}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: "800", fontSize: "35px" }}
                color={"legendaryGreen.main"}
              >
                {idx + 1}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={10} sx={{ pt: 4, pb: 4, pr: 4 }}>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "flex-start",
              }}
              spacing={6}
            >
              <Typography variant={"subtitle1" as any}>{step.title}</Typography>
              <Typography variant={"body" as any}>
                {step.description}
              </Typography>
              {step.linkBubble}
            </Stack>
          </Grid>

          {idx !== steps.length - 1 && (
            <Grid item xs={12}>
              <Divider sx={{ color: "whiteHaze.main" }} />
            </Grid>
          )}
        </Grid>
      ))}
    </Box>
  );
};

export default TimelineComponent;
