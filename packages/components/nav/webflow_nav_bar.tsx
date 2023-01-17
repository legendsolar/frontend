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
import {
  CupIcon,
  GearIcon,
  MagGlassIcon,
  PinIcon,
  PushPinIcon,
} from "../icons/emoji_icons";
import { Image } from "../utils/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../buttons/icon_button";
import {
  faArrowLeft,
  faBars,
  faHamburger,
  faX,
  faXmark,
} from "@fortawesome/pro-solid-svg-icons";
import { useState } from "react";
import { ComponentDivider } from "../basics";

export enum States {
  RESERVE_PANEL,
  LOGGED_OUT,
  LOGGED_IN_NO_PANELS,
  LOGGED_IN_PANELS,
}

export interface WebflowNavBarProps {
  state: States;
  onToHomepage(): void;
  onHowItWorks(): void;
  onAboutUs(): void;
  onTheTeam(): void;
  onFAQs(): void;
}

export const WebflowNavBar = ({
  state,
  onToHomepage,
  onHowItWorks,
  onAboutUs,
  onTheTeam,
  onFAQs,
}: WebflowNavBarProps) => {
  const theme = useTheme();
  const constrained = useMediaQuery(theme.breakpoints.down("lg"));

  const [expanded, setExpanded] = useState(false);

  const headers = [
    {
      text: "How It Works",
      icon: <GearIcon />,
      onClick: onHowItWorks,
    },

    {
      text: "About Us",
      icon: <PushPinIcon />,
      onClick: onAboutUs,
    },
    {
      text: "The Team",
      icon: <CupIcon />,
      onClick: onTheTeam,
    },
    {
      text: "FAQS",
      icon: <MagGlassIcon />,
      onClick: onFAQs,
    },
  ];

  const renderState = (state: States, constrained: boolean): JSX.Element => {
    switch (state) {
      case States.RESERVE_PANEL:
        return constrained ? (
          renderConstrainedHeaders()
        ) : (
          <IconButton
            href="https://legends.solar"
            variant="bubble"
            color="white"
            label=" Back to Legends"
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
          ></IconButton>
        );

      case States.LOGGED_OUT:
        return constrained ? renderConstrainedHeaders() : <div></div>;
      case States.LOGGED_IN_NO_PANELS:
        return constrained ? renderConstrainedHeaders() : <div></div>;
      case States.LOGGED_IN_PANELS:
        return constrained ? renderConstrainedHeaders() : <div></div>;
    }
  };

  const renderConstrainedHeaders = () => {
    return (
      <Stack sx={{ width: "100%" }}>
        {headers.map((header) => (
          <Box>
            <Button
              sx={{
                height: "80px",
                pl: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
              }}
              onClick={header.onClick}
            >
              {header.icon}
              <Typography variant="monoButton">{header.text}</Typography>
            </Button>

            <ComponentDivider
              sx={{ backgroundColor: "white.main" }}
            ></ComponentDivider>
          </Box>
        ))}
      </Stack>
    );
  };

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
          <FontAwesomeIcon icon={expanded ? faXmark : faBars} />
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

            {renderState(state, constrained)}
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
          pt: "88.7px",
          backgroundColor: "whiteFog.main",
        }}
      >
        {renderState(state, constrained)}
      </Stack>
    </SwipeableDrawer>
  );

  return (
    <Toolbar
      style={{
        padding: 0,
        marginBottom: "20px",
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

export default WebflowNavBar;
