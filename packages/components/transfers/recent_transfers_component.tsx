import { Component } from "../basics/component";
import { Typography, Box, Stack, Button } from "@mui/material";
import { TransferGrid } from "./transfer_grid";
import { loadingOrEmptyTransfers } from "./placeholders";
import { DisplayTransfer } from "./types";

interface RecentTransfersComponentProps {
  transfers: Array<DisplayTransfer>;
  loading: boolean;
  widgetMode?: boolean;
  maxTransferNumberToDisplay?: number;
  title: string;
  onViewAllTransfers?: () => void | undefined;
}

export const RecentTransfersComponent = ({
  transfers,
  loading,
  widgetMode = false,
  maxTransferNumberToDisplay = 2,
  title = "Recent Transfers",
  onViewAllTransfers = undefined,
}: RecentTransfersComponentProps) => {
  const emptyOrNull = !transfers || transfers?.length === 0;

  const emptyOrNullOrLoading = emptyOrNull || loading;

  const renderTransfers = emptyOrNullOrLoading
    ? loadingOrEmptyTransfers
    : transfers;

  return (
    <Component
      standardWidth={widgetMode}
      shadow={true}
      sx={{ width: { md: "400px", xs: "100%" } }}
    >
      <Typography variant={"smallHeadline" as any} sx={{ opacity: 1 }}>
        {emptyOrNull && !loading ? "No transfers yet" : title}
      </Typography>

      {emptyOrNullOrLoading ? (
        <Box
          style={
            loading
              ? {
                  animation: "opacityAnimation 2s infinite",
                  animationTimingFunction: "ease-in-out",
                }
              : {
                  opacity: 0.5,
                }
          }
        >
          <TransferGrid
            transfers={renderTransfers.slice(0, maxTransferNumberToDisplay)}
            loading={false}
            constrained={true}
          ></TransferGrid>
        </Box>
      ) : (
        <TransferGrid
          transfers={renderTransfers.slice(0, maxTransferNumberToDisplay)}
          loading={false}
          constrained={true}
        ></TransferGrid>
      )}

      {onViewAllTransfers && (
        <Stack direction={"row"} justifyContent="flex-end">
          <Button variant="text" onClick={onViewAllTransfers}>
            <Typography
              variant={"smallLabel" as any}
              color="legendaryGreen.main"
              sx={{ ml: 1 }}
            >
              {"View All"}
            </Typography>
          </Button>
        </Stack>
      )}
    </Component>
  );
};
