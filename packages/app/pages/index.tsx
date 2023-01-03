import { Button, Stack, Typography, Grid, Divider } from "@mui/material";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import DualPanelView from "@project/components/views/dual_pane_view";
import { useFirebaseApp } from "reactfire";
import { UserCard } from "components/user_card";
import { useAuth } from "@project/hooks/use_auth";
import { getAuth } from "firebase/auth";
import { FacilityCard } from "components/facility_card";
import { ListFacilities } from "components/list_facilities";
import { CreateReservation } from "components/create_reservation";
import { ListReservations } from "components/list_reservations";
import { ProvideReservations } from "utility/use_reservations";
import { userInfo } from "os";

const renderAuthView = () => {
  const { signInWithGoogle, signInWithFacebook } = useAuthProviders();
  const { user, signout } = useAuth();
  console.log({ signUpUser: user });
  if (user?.uid) {
    return (
      <ProvideReservations>
        <div style={{ width: "100%" }}>
          <hr />
          <Grid item xs={12}>
            <div>user:</div>
            <UserCard uid={user.uid} />
          </Grid>

          <hr />
          <Grid item xs={12}>
            <div>create new reservation:</div>
            <CreateReservation userId={user.uid} />
          </Grid>
          <hr />

          <Grid item xs={12}>
            <div>your current reservations</div>
            <ListReservations userId={user.uid} />
          </Grid>
          <hr />

          <Grid item xs={12}>
            <div>list of facilities:</div>
            <ListFacilities />
          </Grid>

          <button onClick={() => signout()} disabled={!user}>
            log out
          </button>
        </div>
      </ProvideReservations>
    );
  } else {
    return (
      <Grid item xs={12}>
        <Typography>Sign up with:</Typography>
        <Button onClick={signInWithGoogle}>Google</Button>
        <Button onClick={signInWithFacebook}>Facebook</Button>
        <Button>Apple</Button>
        <Button>Microsoft</Button>
        <Button>Twitter?</Button>
      </Grid>
    );
  }
};

export default () => {
  return (
    <div>
      <Grid container sx={{ mt: 30 }}>
        {renderAuthView()}
      </Grid>
    </div>
  );
};
