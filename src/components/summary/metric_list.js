import { Stack, Typography, Tooltip } from "@mui/material";

const MetricList = ({ valuePairs }) => {
    if (!valuePairs) {
        return <></>;
    }

    return (
        <Stack spacing={2} sx={{ width: "100%", height: "100%" }}>
            {valuePairs.map(({ metric, value }) => (
                <Stack
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems="center"
                    key={metric + value}
                >
                    <Tooltip title="How is this calculated?">
                        <Typography variant="label">{metric}</Typography>
                    </Tooltip>
                    <Typography variant="subtitle2">{value}</Typography>
                </Stack>
            ))}
        </Stack>
    );
};

export default MetricList;
