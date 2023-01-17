import {
  Button,
  Stack,
  Typography,
  Toolbar,
  Box,
  AppBar,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
} from "@mui/material";
import { CreateAccountToolbar } from "./create_account_toolbar";
import { LoggedOutToolbar } from "./logged_out_toolbar";
import TypemarkSolarSVG from "../assets/logos/typemark_solar_dark.svg";
import LoggedInToolbar from "./logged_in_toolbar";
import { MagGlassIcon } from "../icons/emoji_icons";
import { Image } from "../utils/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../buttons/icon_button";
import {
  faArrowLeft,
  faBars,
  faHamburger,
} from "@fortawesome/pro-solid-svg-icons";
import { useState } from "react";

export enum States {
  RESERVE_PANEL,
  LOGGED_OUT,
  LOGGED_IN_NO_PANELS,
  LOGGED_IN_PANELS,
}

export interface WebflowNavBarProps {
  state: States;
  constrained: boolean;
  onToHomepage(): void;
  onHowItWorks(): void;
  onAboutUs(): void;
  onTheTeam(): void;
  onFAQs(): void;
}

export const WebflowNavBar = ({
  state,
  constrained,
  onToHomepage,
  onHowItWorks,
  onAboutUs,
  onTheTeam,
  onFAQs,
}: WebflowNavBarProps) => {
  const [expanded, setExpanded] = useState(false);

  const leftOfLogo = (state: States): JSX.Element => {
    switch (state) {
      case States.RESERVE_PANEL:
        return (
          <IconButton
            href="https://legends.solar"
            variant="bubble"
            color="white"
            label=" Back to Legends"
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
          ></IconButton>
        );
      case States.LOGGED_OUT:
        return <></>;
      case States.LOGGED_IN_NO_PANELS:
        return <></>;
      case States.LOGGED_IN_PANELS:
        return <></>;
    }
  };

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

  const constrainedHeader = () => {
    return (
      <Box
        sx={{
          width: "100%",
          pl: "16px",
          pr: "16px",
          height: "68.63px",
          backgroundColor: "white.main",
        }}
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Image
          src={TypemarkSolarSVG}
          style={{
            width: "100px",
          }}
        ></Image>

        <Button
          sx={{
            minWidth: "30px",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </Box>
    );
  };

  const nonConstrainedHeader = () => {
    return (
      <Box
        sx={{
          width: "100%",
          ml: "30px",
          mr: "30px",
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
            justifyContent={
              state === States.RESERVE_PANEL ? "space-between" : "flex-start"
            }
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

            {leftOfLogo(state)}
          </Stack>
        </Box>
      </Box>
    );
  };

  const drawer = () => (
    <SwipeableDrawer
      anchor="right"
      open={expanded}
      onClose={() => {
        setExpanded(false);
      }}
      onOpen={() => {}}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          height: "100%",
          width: "100vw",
          pt: "18px",
          backgroundColor: "whiteFog.main",
        }}
      ></Stack>
    </SwipeableDrawer>
  );

  return (
    <Toolbar
      style={{
        padding: 0,
      }}
      sx={{
        width: "100%",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      {constrained ? constrainedHeader() : nonConstrainedHeader()}
      {drawer()}
    </Toolbar>
  );
};

export default () => {
  const theme = useTheme();
  const constrained = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <WebflowNavBar
      {...{
        state: States.RESERVE_PANEL,
        constrained,
        onToHomepage: () => {},
        onHowItWorks: () => {},
        onAboutUs: () => {},
        onTheTeam: () => {},
        onFAQs: () => {},
      }}
    ></WebflowNavBar>
  );
};
