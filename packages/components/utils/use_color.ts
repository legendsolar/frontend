import { useTheme } from "@mui/material";

export const useThemeColor = (color: string) => {
  const theme = useTheme();
  if (color in theme.palette) {
    return theme.palette[color].main;
  }

  return color;
};
