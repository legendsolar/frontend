import { Stack, Button, Typography, Box } from "@mui/material/";
import { boolean } from "yup";

interface IconButtonProps {
  label: string;
  icon: JSX.Element;
  color?: string;
  disabled?: boolean;
  variant?: string;
  iconPosition: "left" | "right";
  iconJustify: string;
  href?: string;
  target?: string;
  onClick?(): void;
  sx?: any;
  style?: any;
}

export const IconButton = ({
  label,
  onClick,
  icon,
  color = "white",
  disabled = false,
  variant = "primary",
  iconPosition = "left",
  iconJustify = "center",
  href,
  target,
  sx = {},
  style = {},
}: IconButtonProps) => {
  return (
    <Button
      variant={variant as any}
      disabled={disabled}
      onClick={onClick}
      href={href}
      target={target}
      style={style}
      sx={{
        backgroundColor: color + ".main",
        color: color + ".contrastText",
        justifyContent: "flex-start",
        ":hover": {
          backgroundColor: color + ".main",
        },
        ...sx,
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: iconJustify,
          width: "100%",
        }}
      >
        {iconPosition === "left" && icon}
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          sx={{
            width: "100%",
          }}
        >
          <Typography
            justifyContent="center"
            display={"inline"}
            variant={"subtitle2" as any}
            color={color + ".contrastText"}
            noWrap
          >
            {label}
          </Typography>
        </Box>
        {iconPosition === "right" && icon}
      </Stack>
    </Button>
  );
};
