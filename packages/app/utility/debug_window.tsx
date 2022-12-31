import { useAuth } from "@project/hooks/use_auth";
import { useFirebaseApp } from "reactfire";

export const DebugWindow = () => {
  const app = useFirebaseApp();
  const { user } = useAuth();

  const emulator =
    !!process.env.NEXT_PUBLIC_FIREBASE_EMULATOR &&
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR == "TRUE";
  return (
    <div style={{ position: "absolute", top: "0px", left: "0px" }}>
      <div
        style={{
          fontSize: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>{"emulator: " + emulator}</div>
        <div>{"user logged in: " + !!user}</div>
        <div>{app.options.projectId}</div>
      </div>
    </div>
  );
};
