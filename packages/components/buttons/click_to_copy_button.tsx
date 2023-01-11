import { Stack, Button, Typography, Box } from "@mui/material/";
import { useState } from "react";
import { copyTextToClipboard } from "@p/utils/share";

interface ClickToCopyButtonProps {
  copyText: string;
  disabled?: boolean;
}

export const ClickToCopyButton = ({
  copyText,
  disabled = false,
}: ClickToCopyButtonProps) => {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  const bg = (hover, clicked) => {
    if (clicked) return "grassGreen.main";

    if (hover) return "skyBlue.main";

    return "white.main";
  };

  return (
    <Button
      disabled={disabled}
      onClick={() => {
        copyTextToClipboard(copyText);
        setClicked(true);
        setTimeout(() => setClicked(false), 500);
      }}
      sx={{
        p: 3,
        backgroundColor: bg(hover, clicked),
        justifyContent: "flex-start",
        "&:hover": {
          backgroundColor: bg(hover, clicked),
        },
        borderRadius: "5px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {clicked ? (
        <Stack
          sx={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
          }}
          spacing={4}
        >
          <Typography
            variant={"subtitle1" as any}
            color={hover ? "white.main" : "blackDawn.main"}
          >
            {"Copied to keyboard!"}
          </Typography>
        </Stack>
      ) : (
        <Stack
          sx={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
          }}
          spacing={4}
        >
          <Typography
            variant={"subtitle1" as any}
            color={hover ? "white.main" : "blackDawn.main"}
          >
            {"Click to copy"}
          </Typography>
          <Typography
            variant={"smallHeadline" as any}
            color={hover ? "white.main" : "skyBlue.main"}
            sx={{ textAlign: "left" }}
          >
            {copyText}
          </Typography>
        </Stack>
      )}
    </Button>
  );
};
