import { Stack, Typography } from "@mui/material";
import { useUser } from "reactfire";

const MemberHeader = ({ sx }) => {
    const { status, data: user } = useUser();

    const name = "TEST NAME";
    const memberInfo = "Member since 2022";

    return (
        <Stack sx={sx ? sx : {}}>
            <Typography variant="headline2">{name}</Typography>
            <Typography variant="label">{memberInfo}</Typography>
        </Stack>
    );
};

export default MemberHeader;
