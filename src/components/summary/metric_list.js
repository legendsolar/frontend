import { Stack, Typography, Tooltip } from "@mui/material";

const MetricList = (props) => {
    return (
        <Stack spacing={2} sx={{ mt: 2, mb: 2 }}>
            {props.valuePairs &&
                props.valuePairs.map(({ metric, value }) => (
                    <Stack
                        direction="row"
                        justifyContent={"space-between"}
                        key={metric + value}
                    >
                        <Tooltip title="How is this calculated?">
                            <Typography variant="description">
                                {metric}
                            </Typography>
                        </Tooltip>
                        <Typography variant="label">{value}</Typography>
                    </Stack>
                ))}
        </Stack>
    );
};

export default MetricList;
