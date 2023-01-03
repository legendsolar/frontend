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

const renderAuthView = (userId: string | undefined) => {
  if (userId) {
    return (
      <div>
        <hr />
        <Grid item xs={12}>
          <div>user:</div>
          <UserCard uid={userId} />
        </Grid>

        <hr />
        <Grid item xs={12}>
          <div>create new reservation:</div>
          <CreateReservation userId={userId} />
        </Grid>
        <hr />

        <Grid item xs={12}>
          <div>current reservations</div>
          <ListReservations userId={userId} />
        </Grid>
        <hr />

        <Grid item xs={12}>
          <div>facilities:</div>
          <ListFacilities />
        </Grid>
      </div>
    );
  } else {
    return <div>not authenticated</div>;
  }
};

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
        {renderAuthView(user?.uid)}
      </Grid>
    </div>
  );
};
