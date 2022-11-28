import { getFunctions, httpsCallable } from "firebase/functions";
import { useFirebaseApp } from "reactfire";

interface useCloudFunctionsReturnType {
  downloadAllTransfers(): Promise<string>;
}

export const useCloudFunctions = (): useCloudFunctionsReturnType => {
  const app = useFirebaseApp();
  const functions = getFunctions(app);

  const downloadAllTransfers = httpsCallable(functions, "downloadAllTransfers");

  return {
    downloadAllTransfers: async () => {
      const resp = (await downloadAllTransfers()) as any;
      return resp?.data?.downloadLink;
    },
  };
};
