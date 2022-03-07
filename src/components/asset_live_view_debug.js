import React from "react";
import { ref } from "firebase/database";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useDatabaseObjectData } from "reactfire";
import LoadingComponent from "./loading_component";
import { useDatabase } from "reactfire";

const AssetLiveViewDebug = ({ assetId }) => {
    const database = useDatabase();

    const { status, data: metaData } = useDatabaseObjectData(
        ref(database, "assets/" + assetId)
    );

    if (status === "loading") {
        return <LoadingComponent></LoadingComponent>;
    }

    if (!metaData?.description || metaData?.address) {
        return <></>;
    }

    return (
        <Paper sx={{ minWidth: 275 }} variant="container">
            <Typography variant="smallHeadline">{metaData.name}</Typography>
            <Typography variant="description">
                {metaData.description}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                {`Address: ${metaData.address.city}, ${metaData.address.state}`}
            </Typography>
        </Paper>
    );
};

export default AssetLiveViewDebug;
