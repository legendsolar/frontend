import { Button, Stack, Typography, Grid } from "@mui/material";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import DualPanelView from "@project/components/views/dual_pane_view";
import { useFirebaseApp } from "reactfire";
import { UserCard } from "components/user_card";
import { useAuth } from "@project/hooks/use_auth";
import { getAuth } from "firebase/auth";

export default () => {
  const { signInWithGoogle, signInWithFacebook } = useAuthProviders();
  const user = getAuth().currentUser;
  console.log({ signUpUser: user });

  return (
    <div>
      <Grid container sx={{ mt: 30 }}>
        <Grid item xs={12}>
          <Typography>Sign up with:</Typography>
          <Button onClick={signInWithGoogle}>Google</Button>
          <Button onClick={signInWithFacebook}>Facebook</Button>
          <Button>Apple</Button>
          <Button>Microsoft</Button>
          <Button>Twitter?</Button>
        </Grid>

        <Grid item xs={12}>
          <div>query:</div>
          {!!user ? <UserCard uid={user?.uid} /> : <div>not logged in</div>}
        </Grid>
      </Grid>
    </div>
  );
};
