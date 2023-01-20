import {
  Button,
  Stack,
  Typography,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
} from "@mui/material";
import TypemarkSolarSVG from "../assets/logos/typemark_solar_dark.png";
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
import { faArrowLeft, faBars, faXmark } from "@fortawesome/pro-solid-svg-icons";
import { useState } from "react";
import { ComponentDivider } from "../basics";
import { useThemeColor } from "../utils";
import { EXTERNAL_LINKS, redirect } from "@p/utils/webflow/webflowLinking";
import {
  navBarStateXForm,
  useReservations,
} from "@project/hooks/use_reservations";
import { useRouter } from "next/router";

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
  onLogout(): void;
  onLogin(): void;
  onGetEarlyAccess(): void;
  onCheckStatus(): void;
}

export const WebflowNavBar = ({
  state,
  constrained,
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
    const render = (leftJustify, rightJustify) => (
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

          {leftJustify}
        </Stack>

        {rightJustify}
      </Stack>
    );

    switch (state) {
      case States.LOGGED_OUT:
      case States.RESERVE_PANEL:
        return constrained
          ? renderConstrainedHeaders()
          : render(
              <></>,
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
          : render(
              renderNonConstrainedHeaders(),
              renderActionButtons(state, constrained)
            );
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
    return headers.map((header) => (
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
    ));
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
          mt: "25px",
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

export const WebflowNavBarDefault = () => {
  const { state, logout } = useReservations();
  const router = useRouter();

  const theme = useTheme();
  const constrained = useMediaQuery(theme.breakpoints.down("lg"));

  const props: WebflowNavBarProps = {
    state: navBarStateXForm(state),
    constrained,
    onToHomepage: () => redirect(EXTERNAL_LINKS.HOME),
    onAboutUs: () => redirect(EXTERNAL_LINKS.PAGES.ABOUT_US),
    onFAQs: () => redirect(EXTERNAL_LINKS.PAGES.FAQS),
    onHowItWorks: () => redirect(EXTERNAL_LINKS.PAGES.HOW_IT_WORKS),
    onTheTeam: () => redirect(EXTERNAL_LINKS.PAGES.TEAM),
    onLogout: logout,
    onGetEarlyAccess: () => router.push("./reserve"),
    onCheckStatus: () => router.push("./waitlist"),
    onLogin: () => router.push("./sign_in"),
  };

  return <WebflowNavBar {...props}></WebflowNavBar>;
};

export default WebflowNavBar;
