import { Button, Stack, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { CreateAccountToolbar } from "./create_account_toolbar";
import { LoggedOutToolbar } from "./logged_out_toolbar";
import TypemarkSolarSVG from "../assets/logos/typemark_solar_dark.svg";
import LoggedInToolbar from "./logged_in_toolbar";
import { MagGlassIcon } from "../icons/emoji_icons";
import { Image } from "../utils/image";

export interface WebflowNavBarProps {
  constrained: boolean;
  onToHomepage(): void;
  onHowItWorks(): void;
  onAboutUs(): void;
  onTheTeam(): void;
  onFAQs(): void;
}

export const WebflowNavBar = ({
  constrained,
  onToHomepage,
  onHowItWorks,
  onAboutUs,
  onTheTeam,
  onFAQs,
}: WebflowNavBarProps) => {
  const headers = [
    {
      text: "How It Works",
      onClick: onHowItWorks,
    },

    {
      text: "About Us",
      onClick: onAboutUs,
    },
    {
      text: "The Team",
      onClick: onTheTeam,
    },
    {
      text: "FAQS",
      onClick: onFAQs,
    },
  ];

  return (
    <Toolbar
      style={{
        padding: 0,
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
        display="flex"
        justifyContent={"center"}
      >
        <Box
          sx={{
            width: "100%",
            mt: 10,
            mb: 10,
            ml: {
              md: 0,
              sm: 5,
            },
            mr: {
              md: 0,
              sm: 5,
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems={"center"}
            spacing={"40px"}
            sx={{
              width: "100%",
              zIndex: 1,
              transform: "translate3d(0, 0, 0px)",
            }}
          >
            <Image
              src={TypemarkSolarSVG}
              style={{
                width: "125px",
              }}
            ></Image>

            {headers.map(renderHeader)}
          </Stack>
        </Box>
      </Box>
    </Toolbar>
  );
};

const renderHeader = (header, id) => {
  return (
    <Button key={id} onClick={header.onClick} sx={{ alignItems: "center" }}>
      <MagGlassIcon sx={{ width: "16px", height: "16px" }} />
      <Typography variant={"monoButton" as any}>{header.text}</Typography>
    </Button>
  );
};

export default () => (
  <WebflowNavBar
    {...{
      constrained: false,
      onToHomepage: () => {},
      onHowItWorks: () => {},
      onAboutUs: () => {},
      onTheTeam: () => {},
      onFAQs: () => {},
    }}
  ></WebflowNavBar>
);
