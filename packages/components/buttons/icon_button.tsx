import { Stack, Button, Typography, Box } from "@mui/material/";
import { boolean } from "yup";

interface IconButtonProps {
  label: string;
  icon: JSX.Element;
  color?: string;
  disabled?: boolean;
  variant?: string;
  href?: string;
  target?: string;
  onClick?(): void;
}

export const IconButton = ({
  label,
  onClick,
  icon,
  color = "white",
  disabled = false,
  variant = "primary",
  href,
  target,
}: IconButtonProps) => {
  return (
    <Button
      variant={variant as any}
      disabled={disabled}
      onClick={onClick}
      href={href}
      target={target}
      sx={{
        backgroundColor: color + ".main",
        color: color + ".contrastText",
        justifyContent: "flex-start",
        ":hover": {
          backgroundColor: color + ".main",
        },
      }}
    >
      {icon}
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box display="flex" justifyContent={"center"} alignItems="center">
          <Typography
            justifyContent="center"
            variant={"subtitle2" as any}
            color={color + ".contrastText"}
          >
            {label}
          </Typography>
        </Box>
      </Stack>
    </Button>
  );
};
