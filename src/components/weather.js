function Weather(props) {
    return (
        <Paper
            sx={{
                minWidth: 275,
                p: 2,
                "& .MuiTextField-root": { m: 1 },
            }}
        >
            <BasicTabs></BasicTabs>
        </Paper>
    );
}
export default Weather;
