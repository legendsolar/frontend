import DefaultView from "../views/default_view";
import { Grid, Paper, Typography } from "@mui/material";

export const GridPage = () => {
    return (
        <DefaultView>
            <Grid container spacing={2} sx={{ height: "80vh" }}>
                <Grid item xs={4} sx={{ backgroundColor: "blue" }}>
                    <Paper
                        sx={{
                            height: "300px",
                            width: "300px",
                            backgroundColor: "white",
                        }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography>300x300</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} sx={{ backgroundColor: "red" }}>
                    <Paper
                        sx={{
                            height: "300px",
                            width: "100%",
                            backgroundColor: "white",
                        }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography>100%x300</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} sx={{ backgroundColor: "green" }}></Grid>
            </Grid>
        </DefaultView>
    );
};
