import { Stack, Typography } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { auth, database, firebaseApp } from "../Firebase";
import { useAuth } from "../hooks/use_auth";

const MemberHeader = ({ sx }) => {
    const auth = useAuth();
    const user = auth.user;

    const [userInfoSnap, userInfoSnapLoading, userInfoSnapError] = useObject(
        ref(database, "users/" + user.uid)
    );

    var name = "";

    if (!!userInfoSnap && !userInfoSnapLoading && !userInfoSnapError) {
        const userInfoObj = userInfoSnap.val();
        name = userInfoObj.name.first + " " + userInfoObj.name.last;
    }

    var memberInfo = "Member since 2022";

    return (
        <Stack sx={sx ? sx : {}}>
            <Typography variant="headline2">{name}</Typography>
            <Typography variant="label">{memberInfo}</Typography>
        </Stack>
    );
};

export default MemberHeader;
