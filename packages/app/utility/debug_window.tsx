import { useAuth } from "@project/hooks/use_auth";
import { useFirebaseApp } from "reactfire";

export const DebugWindow = () => {
  const app = useFirebaseApp();
  const { user, isAuthenticating, signout } = useAuth();

  const emulator =
    !!process.env.NEXT_PUBLIC_FIREBASE_EMULATOR &&
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR == "TRUE";
  return (
    <div style={{ position: "absolute", top: "0px", right: "0px" }}>
      <div
        style={{
          fontSize: "10px",
          display: "flex",
          flexDirection: "column",
          border: "solid 1px #FFF",
          padding: "2px",
        }}
      >
        <div>{"emulator: " + emulator}</div>
        <div>{"auth: " + !!user}</div>
        <div>{"authenticating: " + isAuthenticating}</div>
        <div>{"userId: " + user?.uid}</div>
        <div>{"auth provider: " + user?.providerId}</div>
        <div>{"app: " + app.options.projectId}</div>
        <div>{"query endpoint: " + process.env.NEXT_PUBLIC_GRAPH_QL_URL}</div>
      </div>
    </div>
  );
};
