import { Stack, Button, Typography, SwipeableDrawer } from "@mui/material";
import { WalletIcon } from "../icons/icons";
import { ROUTES } from "../../app_react/src/routes/routes";
import { useState } from "react";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { CircledIcon } from "../icons/icons";
import { TypewriterText } from "../utils/typewriter_text";

const LoggedInToolbar = ({
  loading,
  onYourRooftop,
  onTransaction,
  onDocuments,
  onAvailablePanels,
  onAccount,
  onWallet,
  onLogOut,
  walletBalance,
  currentState,
  constrained,
}) => {
  const [expanded, setExpanded] = useState(false);

  const headers = [
    {
      text: "Your Rooftop",
      onClick: onYourRooftop,
      state: ROUTES.USER_HOME,
    },
    {
      text: "Transactions",
      onClick: onTransaction,
      state: ROUTES.TRANSACTIONS,
    },
    {
      text: "Documents",
      onClick: onDocuments,
      state: ROUTES.DOCUMENTS,
    },
    {
      text: "Available Panels",
      onClick: onAvailablePanels,
      state: ROUTES.DISCOVER,
    },
    {
      text: "Account",
      onClick: onAccount,
      state: ROUTES.ACCOUNT,
      outline: true,
    },
    {
      text: "Legends Wallet",
      onClick: onWallet,
      state: ROUTES.WALLET,
      wallet: true,
    },
  ];

  const renderHeader = (header, id) => {
    if (header.wallet && !constrained) {
      return (
        <Stack
          key={id}
          sx={{ width: "175px", alignItems: "flex-end" }}
          spacing={1}
        >
          <Typography
            display="inline"
            variant={
              ROUTES.WALLET === currentState
                ? ("monoButtonBold" as any)
                : ("monoButton" as any)
            }
            sx={{
              lineHeight: "12px",
            }}
          >
            Legends Wallet
          </Typography>
          <Button
            variant={"header-filled" as any}
            sx={{
              mt: 0,
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "175px",
              p: 4,
            }}
            onClick={onWallet}
          >
            <WalletIcon />
            {loading ? <TypewriterText /> : "$" + walletBalance}
          </Button>
        </Stack>
      );
    }

    return (
      <Button
        key={id}
        variant={
          header.outline && !constrained
            ? ("header-outlined" as any)
            : ("header" as any)
        }
        onClick={header.onClick}
      >
        <Typography
          variant={
            header.state === currentState
              ? ("monoButtonBold" as any)
              : ("monoButton" as any)
          }
        >
          {header.text}
        </Typography>
      </Button>
    );
  };

  if (!constrained) {
    return (
      <Stack direction="row" alignItems={"flex-end"}>
        {headers.map(renderHeader)}
      </Stack>
    );
  }

  const icon = (
    <Button
      sx={{ justifyContent: "center", display: "flex", minWidth: "25px" }}
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <CircledIcon
        icon={expanded ? <CancelSharpIcon /> : <MenuSharpIcon />}
      ></CircledIcon>
    </Button>
  );

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
        sx={{ height: "100%" }}
      >
        <Stack alignItems={"center"}>
          {headers.map(renderHeader)}
          {icon}
        </Stack>

        <Button variant={"header" as any} onClick={onLogOut}>
          <Typography variant={"monoButtonBold" as any}>{"Log Out"}</Typography>
        </Button>
      </Stack>
    </SwipeableDrawer>
  );

  return (
    <Stack direction="row" alignItems={"center"}>
      {headers
        .filter((header) => header.state === currentState)
        .map(renderHeader)}

      {icon}
      {drawer()}
    </Stack>
  );
};

export default LoggedInToolbar;
