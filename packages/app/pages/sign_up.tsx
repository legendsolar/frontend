import { Button, Stack, Typography } from "@mui/material";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import DualPanelView from "@project/components/views/dual_pane_view";
import { useFirebaseApp } from "reactfire";

export default () => {
  const { signInWithGoogle, signInWithFacebook } = useAuthProviders();

  return (
    <div>
      <DualPanelView
        leftPane={
          <Stack>
            <Typography>Sign up with:</Typography>
            <Button onClick={signInWithGoogle}>Google</Button>
            <Button onClick={signInWithFacebook}>Facebook</Button>
            <Button>Apple</Button>
            <Button>Microsoft</Button>
            <Button>Twitter?</Button>
          </Stack>
        }
      ></DualPanelView>
    </div>
  );
};
