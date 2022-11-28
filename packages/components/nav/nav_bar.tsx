import { Button, Stack, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { CreateAccountToolbar } from "./create_account_toolbar";
import { LoggedOutToolbar } from "./logged_out_toolbar";
import TypemarkSolarSVG from "../assets/logos/typemark_solar_dark.svg";
import LoggedInToolbar from "./logged_in_toolbar";

export interface NavBarProps {
  loading: boolean;
  userIsAuthenticated: boolean;
  userVerified: boolean;
  walletBalance: string;
  currentState: string;
  constrained: boolean;
  onToHomepage(): void;
  onYourRooftop(): void;
  onTransaction(): void;
  onDocuments(): void;
  onAvailablePanels(): void;
  onAccount(): void;
  onWallet(): void;
  onLogOut(): void;
}

export const NavBar = ({
  loading,
  userIsAuthenticated,
  userVerified,
  walletBalance,
  constrained,
  onToHomepage,
  onYourRooftop,
  onTransaction,
  onDocuments,
  onAvailablePanels,
  onAccount,
  onWallet,
  onLogOut,
  currentState,
}: NavBarProps) => {
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
            justifyContent="space-between"
            alignItems={"flex-end"}
            sx={{
              width: "100%",
              zIndex: 1,
              transform: "translate3d(0, 0, 0px)",
            }}
          >
            <Box
              component={"img"}
              src={TypemarkSolarSVG}
              sx={{
                width: {
                  lg: "175px",
                  md: "125px",
                  xs: "100px",
                },
              }}
            ></Box>

            {userIsAuthenticated && userVerified && (
              <LoggedInToolbar
                loading={loading}
                walletBalance={walletBalance}
                onYourRooftop={onYourRooftop}
                onTransaction={onTransaction}
                onDocuments={onDocuments}
                onAvailablePanels={onAvailablePanels}
                onAccount={onAccount}
                onWallet={onWallet}
                onLogOut={onLogOut}
                currentState={currentState}
                constrained={constrained}
              ></LoggedInToolbar>
            )}

            {userIsAuthenticated && !userVerified && (
              <CreateAccountToolbar
                onToHomepage={onToHomepage}
              ></CreateAccountToolbar>
            )}

            {!userIsAuthenticated && <LoggedOutToolbar></LoggedOutToolbar>}
          </Stack>
        </Box>
      </Box>
    </Toolbar>
  );
};
