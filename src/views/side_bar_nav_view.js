import { Stack, Paper, Grid, Container } from "@mui/material";

const SideBarNavView = (props) => {
    return (
        <Stack direction="row" spacing={2} justifyContent={"space-evenly"}>
            <Paper sx={{ width: 400 }}>testing</Paper>

            <Container sx={{ width: 850 }}>
                <Grid container>
                    <Paper>testing</Paper>
                </Grid>
            </Container>
        </Stack>
    );
};

export default SideBarNavView;
