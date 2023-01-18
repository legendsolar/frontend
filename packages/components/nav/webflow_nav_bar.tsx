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
  SunIcon,
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
import { useThemeColor } from "../utils";

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
  onLogout(): void;
  onLogin(): void;
  onGetEarlyAccess(): void;
  onCheckStatus(): void;
}

export const WebflowNavBar = ({
  state,
  onToHomepage,
  onHowItWorks,
  onAboutUs,
  onTheTeam,
  onFAQs,
  onLogout,
  onLogin,
  onGetEarlyAccess,
  onCheckStatus,
}: WebflowNavBarProps) => {
  const theme = useTheme();
  const constrained = useMediaQuery(theme.breakpoints.down("lg"));

  const [expanded, setExpanded] = useState(false);

  const legendaryGreen = useThemeColor("legendaryGreen.main");

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

  const renderTopState = (state: States, constrained: boolean): JSX.Element => {
    switch (state) {
      case States.LOGGED_OUT:
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
      case States.LOGGED_IN_NO_PANELS:
      case States.LOGGED_IN_PANELS:
        return constrained
          ? renderConstrainedHeaders()
          : renderNonConstrainedHeaders();
    }
  };

  const renderActionButtons = (
    state: States,
    constrained: boolean
  ): JSX.Element => {
    const color = () => {
      switch (state) {
        case States.LOGGED_IN_NO_PANELS:
        case States.LOGGED_IN_PANELS:
          return "white";
        case States.RESERVE_PANEL:
        case States.LOGGED_OUT:
        default:
          return "legendaryGreen";
      }
    };

    const text = () => {
      switch (state) {
        case States.LOGGED_IN_NO_PANELS:
        case States.LOGGED_IN_PANELS:
          return "Check Status";
        case States.RESERVE_PANEL:
        case States.LOGGED_OUT:
        default:
          return "Get Early Access";
      }
    };

    const logInOut = () => {
      switch (state) {
        case States.LOGGED_IN_NO_PANELS:
        case States.LOGGED_IN_PANELS:
          return "Log out";
        case States.RESERVE_PANEL:
        case States.LOGGED_OUT:
        default:
          return "Log in";
      }
    };

    const secondaryAction = () => {
      switch (state) {
        case States.LOGGED_IN_NO_PANELS:
        case States.LOGGED_IN_PANELS:
          return onLogout;
        case States.RESERVE_PANEL:
        case States.LOGGED_OUT:
        default:
          return onLogin;
      }
    };

    const primaryAction = () => {
      switch (state) {
        case States.LOGGED_IN_NO_PANELS:
        case States.LOGGED_IN_PANELS:
          return onCheckStatus;
        case States.RESERVE_PANEL:
        case States.LOGGED_OUT:
        default:
          return onGetEarlyAccess;
      }
    };

    if (!constrained) {
      return (
        <Stack direction={"row"} alignItems="center">
          <Button
            variant="secondary"
            onClick={secondaryAction()}
            sx={{
              height: "56px",
              background: "none",
              border: "1px solid ",
              color: legendaryGreen,
            }}
          >
            {logInOut()}
          </Button>
          <IconButton
            variant="primary"
            color={color()}
            onClick={primaryAction()}
            label={text()}
            icon={<SunIcon />}
            iconJustify="center"
            sx={{
              height: "56px",
              color: legendaryGreen,
            }}
          ></IconButton>
        </Stack>
      );
    } else {
      // this is super fucked
      return (
        <Stack sx={{ width: "100%" }}>
          <Button
            variant="secondary"
            color="legendaryGreen.main"
            sx={{
              m: "32px",
              mb: "0px",
              width: "auto",
            }}
            onClick={secondaryAction()}
          >
            {logInOut()}
          </Button>
          <IconButton
            variant="primary"
            color={color()}
            onClick={primaryAction()}
            label={text()}
            style={{
              margin: "32px",
            }}
            icon={<SunIcon />}
            iconJustify="center"
          ></IconButton>
        </Stack>
      );
    }
  };

  const renderNonConstrainedHeaders = () => {
    return (
      <Stack
        direction={"row"}
        justifyContent="space-between"
        spacing={"40px"}
        sx={{ mr: "40px" }}
      >
        <Stack direction={"row"} spacing="40px">
          <Image
            src={TypemarkSolarSVG}
            style={{
              width: "125px",
            }}
          ></Image>
          {headers.map((header) => (
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
              <Typography variant="monoButton" noWrap>
                {header.text}
              </Typography>
            </Button>
          ))}
        </Stack>

        {renderActionButtons(state, constrained)}
      </Stack>
    );
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
              <Typography variant="monoButton" noWrap>
                {header.text}
              </Typography>
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
          mt: "10px",
          mb: "10px",
          ml: {
            md: 0,
            lg: "32px",
          },
          mr: {
            md: 0,
            lg: "32px",
          },

          zIndex: 1,
          transform: "translate3d(0, 0, 0px)",
        }}
      >
        {renderTopState(state, constrained)}
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
      PaperProps={{
        sx: { width: "100%", overflowX: "hidden" },
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          height: "100%",
          pt: "88.7px",
          backgroundColor: "whiteFog.main",
        }}
      >
        {renderTopState(state, constrained)}
        {renderActionButtons(state, constrained)}
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
