import { Stack, Button, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserStatus = () => {
    const navigate = useNavigate();
    const statusItems = [
        {
            title: "Your Information",
            subtitle: "5-10 min",
            statusColor: "legendaryGreen",
            sidebarMessage: "Complete",
        },

        {
            title: "Verify Accreditation",
            subtitle: "20 min",
            statusColor: "pencilYellow",
            sidebarMessage: "In Progress",
        },

        {
            title: "Commit to Invest",
            subtitle: "5-10 min",
            statusColor: "eraserRed",
            sidebarMessage: "Attention Needed",
        },
    ];

    const onClickAction = () => {
        navigate("/complete-account");
    };

    return (
        <Stack spacing={2}>
            <Stack direction={"row"} justifyContent="space-between">
                <Typography variant="smallHeadline">Steps to Invest</Typography>
                <Typography variant="subtitle1">1/3 Steps Complete</Typography>
            </Stack>

            <Grid
                container
                spacing={4}
                sx={{
                    width: "100%",
                }}
            >
                {statusItems.map((item) => {
                    return (
                        <Grid item xs={12} lg={4}>
                            <Stack
                                direction={"row"}
                                sx={{
                                    height: "120px",
                                    width: "100%",
                                    pr: 4,
                                }}
                            >
                                <Stack
                                    sx={{
                                        bgcolor: "whiteFog.main",
                                        borderRadius: "5px 0px 0px 5px",
                                        p: 2,
                                        width: "100%",
                                    }}
                                    onClick
                                    justifyContent={"center"}
                                >
                                    <Typography variant="smallHeadline">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle3">
                                        {item.subtitle}
                                    </Typography>
                                </Stack>

                                <Stack
                                    sx={{
                                        bgcolor: item.statusColor + ".main",
                                        width: "30px",
                                        height: "100%",
                                        borderRadius: "0px 5px 5px 0px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            mt: 2,
                                            color:
                                                item.statusColor +
                                                ".contrastText",
                                            transform: "rotate(90deg)",

                                            fontFamily: "Azeret Mono",
                                            fontSize: "10px",
                                            fontWeight: 800,
                                        }}
                                    >
                                        {item.sidebarMessage}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    );
                })}
                <Grid
                    item
                    xs={12}
                    sx={{
                        width: "100%",
                        mr: 6,
                    }}
                >
                    <Button
                        sx={{
                            width: "100%",
                        }}
                        variant="primary"
                        onClick={onClickAction}
                    >
                        Complete
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default UserStatus;
