import { Stack, Typography, Tooltip } from "@mui/material";
import Divider from "../basics/divider";

const MetricList = ({ valuePairs }) => {
    if (!valuePairs) {
        return <></>;
    }

    return (
        <Stack spacing={2} sx={{ width: "100%", height: "100%" }}>
            {valuePairs.map(({ metric, value }) => (
                <div>
                    <Stack
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems="center"
                        key={metric + value}
                    >
                        <Typography variant="subtitle1">{metric}</Typography>
                        <Typography variant="subtitle2">{value}</Typography>
                    </Stack>
                    <Divider></Divider>
                </div>
            ))}
        </Stack>
    );
};

export default MetricList;
