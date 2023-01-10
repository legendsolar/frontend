import { useAuth } from "@project/hooks/use_auth";
import { useFirebaseApp } from "reactfire";
import { getLocalStorePanelsReserved } from "./use_reservations";
import DisabledSSR from "./disable_ssr";

export const DebugWindow = () => {
  const app = useFirebaseApp();
  const { user, isAuthenticating, signout } = useAuth();

  const emulator =
    !!process.env.NEXT_PUBLIC_FIREBASE_EMULATOR &&
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR == "TRUE";
  return (
    <DisabledSSR>
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          right: "0px",
          zIndex: 10000,
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            display: "flex",
            flexDirection: "column",
            border: "solid 1px #000",
            padding: "2px",
          }}
        >
          <div>{"emulator: " + emulator}</div>
          <div>{"authenticated: " + !!user}</div>
          <div>{"authenticating: " + isAuthenticating}</div>
          <div>{"userId: " + user?.uid}</div>
          <div>{"auth provider: " + user?.providerId}</div>
          <div>{"app: " + app.options.projectId}</div>
          <div>{"panel state: " + getLocalStorePanelsReserved()}</div>
          <div>{"query endpoint: " + process.env.NEXT_PUBLIC_GRAPH_QL_URL}</div>
          <button onClick={signout}>sign out</button>
        </div>
      </div>
    </DisabledSSR>
  );
};
