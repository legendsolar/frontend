import { format } from "date-fns";
import { Transfer, TransferStatus, TransferType } from "@p/schema";
import { DisplayTransfer } from "@project/components/transfers/types";

export const createdDate = (created: Date): string => {
  if (created instanceof Date) {
    return format(created, "PP");
  } else {
    const date = new Date(created);
    return format(date, "PP");
  }
};

export const transferTitle = (transfer: any) => {
  if (transfer.type === "DIVIDEND") {
    return "Dividend for " + transfer.month;
  } else {
    return createdDate(transfer.created);
  }
};

export const transferSourceName = (transfer: Transfer): string => {
  if (transfer.type === "DIVIDEND") {
    if (transfer?.facility?.name) {
      return transfer.facility.name;
    }
  }

  if (transfer.sourceAccount.name) {
    return transfer.sourceAccount.name;
  }

  return "source";
};

export const transferDestinationName = (transfer: Transfer): string => {
  if (transfer?.destinationAccount.name) {
    return transfer.destinationAccount.name;
  } else {
    return "destination";
  }
};

export const transferTypeTransformer = (type: TransferType): string => {
  switch (type) {
    case TransferType.Dividend:
      return "Dividend Payment";
    case TransferType.Investment:
      return "Investment";
    case TransferType.Transfer:
      return "Bank Transfer";
    default:
      return "Unknown";
  }
};

export const transferColorTransformer = (status: TransferStatus): string => {
  switch (status) {
    case TransferStatus.Failed:
      return "eraserRed";
    case TransferStatus.Cancelled:
      return "eraserRed";
    case TransferStatus.Pending:
      return "pencilYellow";
    case TransferStatus.Processed:
      return "blackDusk";
    default:
      return "eraserRed";
  }
};

export const transferStatusTransformer = (status: TransferStatus): string => {
  switch (status) {
    case TransferStatus.Failed:
      return "Failed";
    case TransferStatus.Cancelled:
      return "Cancelled";
    case TransferStatus.Pending:
      return "Pending";
    case TransferStatus.Processed:
      return "Complete";
    default:
      return "Unknown";
  }
};

export const transferTransformer = (transfer: Transfer): DisplayTransfer => {
  return {
    ...transfer,
    title: transferTitle(transfer),
    destinationName: transferDestinationName(transfer),
    sourceName: transferSourceName(transfer),
    statusName: transferStatusTransformer(transfer.status),
    color: transferColorTransformer(transfer.status),
    date: createdDate(new Date(transfer.created)),
  };
};
