import { Box, Stack, Typography } from "@mui/material";

export const LinearGauge = ({ current, max, color }) => {
  const percent = (current / max) * 100;
  const inactiveColor = "whiteFog.main";

  return (
    <Stack>
      <Stack direction={"row"} spacing={"4px"}>
        <Box
          sx={{
            width: percent + "%",
            height: "14px",
            backgroundColor: color,
            borderRadius: "5px",
          }}
        ></Box>
        <Box
          sx={{
            flexGrow: "1",
            height: "14px",
            backgroundColor: inactiveColor,
            borderRadius: "5px",
          }}
        ></Box>
      </Stack>

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography color={color}>{current}</Typography>
        <Typography color={"blackDawn.main"}>{max - current}</Typography>
      </Stack>
    </Stack>
  );
};